# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  admin                  :boolean          default(FALSE), not null
#  bio                    :text
#  confirmation_sent_at   :datetime
#  confirmation_token     :string
#  confirmed_at           :datetime
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  email_newsletters      :boolean          default(TRUE), not null
#  email_notifications    :boolean          default(TRUE), not null
#  encrypted_password     :string           default(""), not null
#  failed_attempts        :integer          default(0), not null
#  first_name             :string
#  image                  :string
#  jti                    :string
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  locale                 :string           default("fr"), not null
#  locked_at              :datetime
#  provider               :string           default("email"), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  slug                   :string
#  tac                    :boolean          default(TRUE), not null
#  timezone               :string
#  token                  :text
#  uid                    :string           default(""), not null
#  unconfirmed_email      :string
#  unlock_token           :string
#  username               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  country_id             :integer
#  primary_workspace_id   :bigint
#
# Indexes
#
#  index_users_on_confirmation_token    (confirmation_token) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_jti                   (jti) UNIQUE
#  index_users_on_primary_workspace_id  (primary_workspace_id)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#  index_users_on_uid_and_provider      (uid,provider) UNIQUE
#  index_users_on_unlock_token          (unlock_token) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (primary_workspace_id => workspaces.id)
#

require 'rails_helper'

describe UserSerializer do

  before :each do
    expect(User.count).to eq(0)
    FactoryBot.create_list(:user, 3)
  end

  let(:user) { create(:user) }
  let(:users) { User.all }

  it '#serialize' do
    serialized = JSON.parse(UserSerializer.new.serialize(user).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(user.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(users, each_serializer: UserSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(users.count)
  end
end
