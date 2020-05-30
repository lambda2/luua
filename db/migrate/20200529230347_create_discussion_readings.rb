class CreateDiscussionReadings < ActiveRecord::Migration[6.0]
  def change
    create_table :discussion_readings do |t|
      t.references :discussion, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
