class PopulateWorkspaceCategories < ActiveRecord::Migration[6.0]
  def up
    Workspace.all.map(&:create_default_discussion_categories!)
    Discussion.all.map do |discussion|
      cat = discussion.workspace.discussion_categories.where(category: :question).first
      discussion.update(discussion_category: cat)
    end
  end

  def down
    DiscussionCategory.destroy_all
    Discussion.update_all(discussion_category_id: nil)
  end
end
