# typed: false
require 'rails_helper'

RSpec.describe Origin, type: :model do
  it 'Mail origins be created' do
    origin = create(:workspace).mail_origin
    expect(origin).not_to be(nil)
  end
end
