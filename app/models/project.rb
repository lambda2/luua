# == Schema Information
#
# Table name: projects
#
#  id             :bigint           not null, primary key
#  description_md :text
#  name           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  workspace_id   :bigint           not null
#
# Indexes
#
#  index_projects_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#

class Project < ApplicationRecord
  belongs_to :workspace

end
