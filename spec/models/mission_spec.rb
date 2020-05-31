# == Schema Information
#
# Table name: missions
#
#  id                  :bigint           not null, primary key
#  banner_image        :string
#  begin_at            :datetime
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

RSpec.describe Mission, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
