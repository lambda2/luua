FactoryBot.define do

  factory :message_vote, class: MessageVote do
    vote { %i[positive negative].sample }
    message
    user
  end

end
