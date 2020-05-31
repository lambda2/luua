# == Schema Information
#
# Table name: missions
#
#  id                  :bigint           not null, primary key
#  banner_image        :string
#  begin_at            :datetime
#  canceled_at         :datetime
#  completed_at        :datetime
#  created_by          :integer
#  description         :text
#  due_at              :datetime
#  end_at              :datetime
#  hiring_validation   :integer          default("review"), not null
#  image               :string
#  modified_at         :datetime         not null
#  modified_by         :integer
#  name                :string           not null
#  participant_count   :integer
#  physical            :boolean          default(FALSE), not null
#  slug                :string           not null
#  started_at          :datetime
#  status              :integer          default("pending"), not null
#  visibility          :integer          default("draft"), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  discussion_id       :bigint
#  mission_category_id :bigint
#  organization_id     :bigint
#  workspace_id        :bigint
#
# Indexes
#
#  index_missions_on_discussion_id        (discussion_id)
#  index_missions_on_mission_category_id  (mission_category_id)
#  index_missions_on_organization_id      (organization_id)
#  index_missions_on_workspace_id         (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (mission_category_id => mission_categories.id)
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#

require 'rails_helper'

describe MissionSerializer do

  before :each do
    expect(Mission.count).to eq(0)
    FactoryBot.create_list(:mission, 3)
  end

  let(:mission) { create(:mission) }
  let(:missions) { Mission.all }

  it '#serialize' do
    serialized = JSON.parse(MissionSerializer.new.serialize(mission).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized['id']).to eq(mission.id)
  end

  it '#serialize_collection' do
    serialized = JSON.parse(Panko::ArraySerializer.new(missions, each_serializer: MissionSerializer).to_json)
    expect(serialized).not_to be(nil)
    expect(serialized.count).to eq(missions.count)
  end
end
