FactoryBot.define do

  factory :notification, class: Notification do
    code { Notification.codes.keys.sample }
    association :resource, factory: :mission
    user
  end

end
