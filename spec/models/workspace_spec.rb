# == Schema Information
#
# Table name: workspaces
#
#  id              :bigint           not null, primary key
#  image           :string
#  missions_count  :integer          default(0), not null
#  name            :string           not null
#  slug            :string           not null
#  users_count     :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint
#
# Indexes
#
#  index_workspaces_on_organization_id  (organization_id)
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#

require 'rails_helper'

RSpec.describe Workspace, type: :model do
  it 'Can be created' do
    workspace = create(:workspace)
    expect(workspace).not_to be(nil)
  end
end
