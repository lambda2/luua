# == Schema Information
#
# Table name: tags
#
#  id           :bigint           not null, primary key
#  color        :string
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_tags_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#

class Tag < ApplicationRecord
  belongs_to :workspace
end
