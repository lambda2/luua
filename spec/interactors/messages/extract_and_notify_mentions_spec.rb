require 'rails_helper'

RSpec.describe Messages::ExtractAndNotifyMentions, type: :interactor do
  let (:user) { create(:user) }
  let (:notified) { create(:user) }
  let (:message) { create(:message, :with_mentions, user_id: user.id, mentions: [notified]) }
  subject(:context) { Messages::ExtractAndNotifyMentions.call(message: message) }

  describe '.call' do
    context 'when a message without mentions' do

      it 'succeeds' do
        expect(context).to be_a_success
      end

      it 'provides the message_mentions' do
        expect(context.message_mentions.pluck(:id)).to eq(MessageMention.where(user: notified, message: message).pluck(:id))
      end

      it 'created a notification' do
        nots = notified.notifications.where(resource: context.message_mentions.first)

        expect(nots.any?).to be(true)
      end
    end

    context 'when given invalid message' do
      before do
        allow(message).to receive(:serialized_content).and_return(nil)
      end

      it 'fails' do
        expect(context).to be_a_failure
      end
    end
  end
end
