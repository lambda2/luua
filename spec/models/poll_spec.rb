# == Schema Information
#
# Table name: polls
#
#  id                     :bigint           not null, primary key
#  anonymity              :integer          default("anonymous"), not null
#  authentication         :integer          default("required"), not null
#  begin_at               :datetime
#  category               :integer          default(0), not null
#  closed_at              :datetime
#  closed_by              :integer
#  description            :text             not null
#  end_at                 :datetime
#  name                   :string           not null
#  poll_type              :integer          default("single_choice"), not null
#  reveal                 :integer          default("on_close"), not null
#  slug                   :string           not null
#  visibility             :integer          default("draft"), not null
#  vote_count             :integer          default(0), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  discussion_category_id :bigint
#  discussion_id          :bigint
#  user_id                :bigint           not null
#  workspace_id           :bigint           not null
#
# Indexes
#
#  index_polls_on_discussion_category_id  (discussion_category_id)
#  index_polls_on_discussion_id           (discussion_id)
#  index_polls_on_user_id                 (user_id)
#  index_polls_on_workspace_id            (workspace_id)
#
# Foreign Keys
#
#  fk_rails_...  (discussion_category_id => discussion_categories.id)
#  fk_rails_...  (discussion_id => discussions.id)
#  fk_rails_...  (user_id => users.id)
#  fk_rails_...  (workspace_id => workspaces.id)
#
require 'rails_helper'

RSpec.describe Poll, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
