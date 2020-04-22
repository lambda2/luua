# == Schema Information
#
# Table name: workspace_histories
#
#  id            :bigint           not null, primary key
#  change_type   :integer          not null
#  payload       :text
#  resource_type :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint           not null
#  user_id       :bigint
#  workspace_id  :bigint           not null
#
# Indexes
#
#  index_workspace_histories_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_workspace_histories_on_user_id                        (user_id)
#  index_workspace_histories_on_workspace_id                   (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

class WorkspaceHistory < ApplicationRecord
  belongs_to :workspace
  belongs_to :resource, polymorphic: true
  belongs_to :user, optional: true

  BLACKLISTED_ATTRIBUTES = %w[created_at modified_at modified_by updated_at].freeze

  enum change_type: %i[
    create_mission_user
    destroy_mission_user
    update_mission_user
    create_mission
    destroy_mission
    update_mission
    create_user
    destroy_user
    update_user
    create_workspace
    destroy_workspace
    update_workspace
  ], _suffix: true

  def self.whitelist_changes(resource)
    resource.saved_changes.without(*BLACKLISTED_ATTRIBUTES).as_json
  end

  def self.track!(workspace, resource, user = nil)
    payload = whitelist_changes(resource)

    return if payload.blank?

    wh = WorkspaceHistory.create!(
      workspace: workspace,
      user: user || Current.user,
      resource: resource,
      payload: payload.to_json,
      change_type: change_type_for_resource(resource)
    )

    Rails.logger.debug("📖 Tracking change of #{wh.inspect}")
    wh
  end

  def self.change_type_for_resource(resource)
    change_type = if resource.id_before_last_save.nil?
                    'create'
                  elsif resource.destroyed?
                    'destroy'
                  else
                    'update'
                  end

    "#{change_type}_#{resource.class.to_s.underscore}".to_sym
  end
end
