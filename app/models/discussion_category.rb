# == Schema Information
#
# Table name: discussion_categories
#
#  id           :bigint           not null, primary key
#  category     :integer          default("other"), not null
#  color        :string
#  icon         :string
#  name         :string           not null
#  slug         :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_discussion_categories_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#
class DiscussionCategory < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :workspace, touch: true
  has_many :discussions, dependent: :nullify

  validates :name, uniqueness: { scope: %i[workspace_id] }

  after_commit :touch_discussions, only: %i[update destroy]

  enum category: {
    other: 0,
    bug: 1,
    idea: 2,
    question: 3
  }, _suffix: true

  def self.defaults!(workspace_id)
    [
      {
        name: 'Idée',
        icon: '🧙🏼‍♂️ ',
        color: '#008d46',
        category: 'idea'
      },
      {
        name: 'Problème',
        icon: '🚧 ',
        color: '#ae5051',
        category: 'other'
      },
      {
        name: 'Question',
        icon: '🤔 ',
        color: '#8d8d8d',
        category: 'question'
      }
    ].each do |params|
      DiscussionCategory.where(
        name: params[:name], workspace_id: workspace_id
      ).first_or_create(params)
    end
  end

  def touch_discussions
    discussions.update_all(updated_at: Time.zone.now)
  end
end
