# == Schema Information
#
# Table name: organizations
#
#  id                :bigint           not null, primary key
#  color             :string
#  description       :text
#  image             :string
#  modified_at       :datetime         not null
#  modified_by       :integer
#  name              :string
#  organization_type :integer
#  slug              :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  country_id        :bigint
#  region_id         :bigint           not null
#
# Indexes
#
#  index_organizations_on_country_id  (country_id)
#  index_organizations_on_name        (name) UNIQUE
#  index_organizations_on_region_id   (region_id)
#  index_organizations_on_slug        (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (region_id => regions.id)
#

require 'rails_helper'

describe OrganizationSerializer do

  before :each do
    expect(Organization.count).to eq(0)
    FactoryBot.create_list(:organization, 3)
  end

  let(:organization) { create(:organization) }
  let(:organizations) { Organization.all }

  it '#serialize' do
    serialized = JSON.parse(OrganizationSerializer.new.serialize(organization).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(organization.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(organizations, each_serializer: OrganizationSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(organizations.count)
  end
end
