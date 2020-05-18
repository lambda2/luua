class UserVoteSerializer < Panko::Serializer
  attributes :id

  has_one :poll, serializer: PollLightSerializer
  has_one :user, serializer: UserLightSerializer
  has_one :poll_option, serializer: PollOptionSerializer

end
