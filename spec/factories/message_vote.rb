
FactoryBot.define do

  factory :message_vote, class: MessageVote do
    vote { [:positive, :negative].sample }
    message
    user
  end
  
 end
