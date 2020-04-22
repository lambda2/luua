# == Schema Information
#
# Table name: mission_users
#
#  id           :bigint           not null, primary key
#  accepted_at  :datetime
#  applied_at   :datetime         not null
#  completed_at :datetime
#  match_score  :integer
#  rejected_at  :datetime
#  reviewed_at  :datetime
#  status       :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  mission_id   :bigint           not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_mission_users_on_mission_id  (mission_id)
#  index_mission_users_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (mission_id => missions.id)
#  fk_rails_...  (user_id => users.id)
#

class MissionUser < ApplicationRecord
  include AASM

  belongs_to :mission
  belongs_to :user

  has_many :workspace_histories, as: :resource

  validates_uniqueness_of :user_id, scope: [:mission_id]

  # - applied: The candidate applied for a mission
  # - rejected: The candidate has been rejected to do this mission
  # - accepted: The candidate has been accepted, he can start
  # - completed: The candidate mission is done
  # - reviewed: The candidate mission has been reviewed and is complete
  enum status: {
    applied: 0,
    rejected: 1,
    accepted: 2,
    completed: 3,
    reviewed: 4
  }, _suffix: true

  scope :contributors, -> { where.not(status: %i[applied rejected]) }

  before_create do
    self.applied_at = Time.zone.now
    self.match_score = compute_match_score
  end

  aasm column: :status, enum: true, logger: Rails.logger do
    state :applied, initial: true
    state :rejected, :accepted, :completed, :reviewed

    event :accept do

      before do
        self.accepted_at = Time.zone.now
      end

      transitions from: :applied, to: :accepted
    end

    event :reject do

      before do
        self.rejected_at = Time.zone.now
      end

      transitions from: %i[applied accepted completed], to: :rejected
    end

    event :complete do

      before do
        self.completed_at = Time.zone.now
      end

      transitions from: %i[accepted], to: :completed
    end

    event :review do

      before do
        self.reviewed_at = Time.zone.now
      end

      transitions from: %i[completed], to: :reviewed
    end

    after_all_transitions :log_status_change
  end

  def log_status_change
    puts "changing from #{aasm.from_state} to #{aasm.to_state} (event: #{aasm.current_event})"
  end

  def compute_match_score
    mission_total = mission.mission_skills.count * 4
    user_total = mission.mission_skills.where(skill_id: user.skill_ids).map do |ms|
      us = user.user_skills.where(skill_id: ms.skill_id).first
      score_for_skill(ms, us)
    end
    mission_total.positive? ? (user_total.sum * 100) / mission_total : 0
  end

  def score_for_skill(ms, us) # rubocop:todo Naming/MethodParameterName
    return 0.1 unless us
    return 1 if ms.mandatory && us.level < ms.level
    return 2 if us.level < ms.level
    return 4 if ms.mandatory && us.level >= ms.level

    3
  end
end
