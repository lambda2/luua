class AddDiscussionToMission < ActiveRecord::Migration[6.0]
  def change
    add_reference :missions, :discussion, foreign_key: true, null: true
  end
end
