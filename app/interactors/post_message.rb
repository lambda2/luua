class PostMessage
  include Interactor::Organizer

  organize Messages::Publish, Messages::ExtractAndNotifyMentions
end
