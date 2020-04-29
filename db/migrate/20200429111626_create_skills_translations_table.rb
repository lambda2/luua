class CreateSkillsTranslationsTable < ActiveRecord::Migration[6.0]
  def self.up
    I18n.with_locale(:en) do
      Skill.create_translation_table!({
        name: :string,
        full_name: :string,
        description: :text
      }, {
        migrate_data: true,
        remove_source_columns: true
      })
    end
  end

  def self.down
    Skill.drop_translation_table! migrate_data: true
  end
end
