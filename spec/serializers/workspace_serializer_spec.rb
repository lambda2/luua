# == Schema Information
#
# Table name: workspaces
#
#  id                :bigint           not null, primary key
#  description       :text
#  discussions_count :integer          default(0), not null
#  image             :string
#  membership        :integer          default("closed"), not null
#  missions_count    :integer          default(0), not null
#  name              :string           not null
#  polls_count       :integer          default(0), not null
#  slug              :string           not null
#  users_count       :integer          default(0), not null
#  website           :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  country_id        :bigint
#  organization_id   :bigint
#  region_id         :bigint
#
# Indexes
#
#  index_workspaces_on_country_id       (country_id)
#  index_workspaces_on_organization_id  (organization_id)
#  index_workspaces_on_region_id        (region_id)
#
# Foreign Keys
#
#  fk_rails_...  (country_id => countries.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (region_id => regions.id)
#

require 'rails_helper'

describe WorkspaceSerializer do

  before :each do
    expect(Workspace.count).to eq(0)
    FactoryBot.create_list(:workspace, 3)
  end

  let(:workspace) { create(:workspace) }
  let(:workspaces) { Workspace.all }

  it '#serialize' do
    serialized = JSON.parse(WorkspaceSerializer.new.serialize(workspace).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(workspace.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(workspaces, each_serializer: WorkspaceSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(workspaces.count)
  end
end
