# == Schema Information
#
# Table name: priorities
#
#  id           :bigint           not null, primary key
#  color        :string
#  name         :string
#  position     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  workspace_id :bigint           not null
#
# Indexes
#
#  index_priorities_on_workspace_id  (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (workspace_id => workspaces.id)
#

class Priority < ApplicationRecord
  belongs_to :workspace

  def self.defaults!(workspace_id)
    [
      ['low', '#ccc'],
      %w[medium orange],
      %w[high red]
    ].each do |params|
      Priority.where(
        name: params[0], color: params[1], workspace_id: workspace_id
      ).first_or_create
    end
  end
end
