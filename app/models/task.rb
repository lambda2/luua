# == Schema Information
#
# Table name: tasks
#
#  id              :bigint           not null, primary key
#  blocked_by      :integer
#  description_md  :text
#  due_at_datetime :string
#  starts_at       :datetime
#  status          :string
#  task_type       :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  assignee_id     :integer
#  author_id       :integer
#  parent_id       :integer
#  priority_id     :bigint           not null
#  project_id      :bigint           not null
#
# Indexes
#
#  index_tasks_on_assignee_id  (assignee_id)
#  index_tasks_on_author_id    (author_id)
#  index_tasks_on_blocked_by   (blocked_by)
#  index_tasks_on_parent_id    (parent_id)
#  index_tasks_on_priority_id  (priority_id)
#  index_tasks_on_project_id   (project_id)
#  index_tasks_on_status       (status)
#  index_tasks_on_task_type    (task_type)
#
# Foreign Keys
#
#  fk_rails_...  (priority_id => priorities.id)
#  fk_rails_...  (project_id => projects.id)
#

class Task < ApplicationRecord
  belongs_to :project
  belongs_to :priority

  belongs_to :author, class_name: 'User', optional: true
  belongs_to :assignee, class_name: 'User', optional: true
  belongs_to :parent_id, class_name: 'Task', optional: true
  belongs_to :blocked, class_name: 'Task', optional: true

  def workspace
    project&.workspace
  end

end
