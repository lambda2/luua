class WorkspaceInvitationSerializer < Panko::Serializer
  attributes :id, :email, :send_email, :status, :inviter_id,
             :user_id, :workspace_id, :created_at, :updated_at

  has_one :inviter, serializer: UserLightSerializer
  has_one :user, serializer: UserLightSerializer

end
