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

RSpec.describe Workspace, type: :model do
  it 'Can be created' do
    workspace = create(:workspace)
    expect(workspace).not_to be(nil)
  end
end
