class AddLocaleAndBioToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :locale, :string, null: false, default: 'fr'
    add_column :users, :bio, :text
  end
end
