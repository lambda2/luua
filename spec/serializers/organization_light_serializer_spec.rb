require 'rails_helper'

describe OrganizationLightSerializer do

  before :each do
    expect(Organization.count).to eq(0)
    FactoryBot.create_list(:organization, 3)
  end

  let(:organization) { create(:organization) }
  let(:organizations) { Organization.all }

  it '#serialize' do
    serialized = JSON.parse(OrganizationLightSerializer.new.serialize(organization).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(organization.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(organizations, each_serializer: OrganizationLightSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(organizations.count)
  end
end
