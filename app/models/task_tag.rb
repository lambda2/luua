# == Schema Information
#
# Table name: task_tags
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  tag_id     :bigint           not null
#  task_id    :bigint           not null
#
# Indexes
#
#  index_task_tags_on_tag_id   (tag_id)
#  index_task_tags_on_task_id  (task_id)
#
# Foreign Keys
#
#  fk_rails_...  (tag_id => tags.id)
#  fk_rails_...  (task_id => tasks.id)
#

class TaskTag < ApplicationRecord
  belongs_to :task
  belongs_to :tag
end
