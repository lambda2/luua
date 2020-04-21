# typed: false
require 'rails_helper'

RSpec.describe UserInfo, type: :model do
  it 'Can be created' do
    user_info = create(:user_info)
    expect(user_info).not_to be(nil)
  end
end
