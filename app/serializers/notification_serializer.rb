# == Schema Information
#
# Table name: notifications
#
#  id            :bigint           not null, primary key
#  code          :integer
#  content       :string
#  link          :string
#  resource_type :string
#  title         :string
#  viewed_at     :datetime
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  resource_id   :bigint
#  user_id       :bigint           not null
#
# Indexes
#
#  index_notifications_on_resource_type_and_resource_id  (resource_type,resource_id)
#  index_notifications_on_user_id                        (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class NotificationSerializer < Panko::Serializer
  attributes :id, :title, :content, :resource_type, :resource_id,
             :user_id, :viewed_at, :link, :code, :resource,
             :created_at, :updated_at

  def resource
    case object.resource_type
    when 'MissionUser'
      MissionUserLightSerializer.new.serialize(object.resource)
    when 'WorkspaceInvitation'
      puts "~~~~~~~~~~~~ß"
      puts object.inspect
      puts object.resource.inspect
      WorkspaceInvitationSerializer.new.serialize(object.resource)
    end
  end
end
