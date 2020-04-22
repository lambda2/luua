require 'rails_helper'

describe WorkspaceLightSerializer do

  before :each do
    expect(Workspace.count).to eq(0)
    FactoryBot.create_list(:workspace, 3)
  end

  let(:workspace) { create(:workspace) }
  let(:workspaces) { Workspace.all }

  it '#serialize' do
    serialized = JSON.parse(WorkspaceLightSerializer.new.serialize(workspace).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(workspace.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(workspaces, each_serializer: WorkspaceLightSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(workspaces.count)
  end
end
