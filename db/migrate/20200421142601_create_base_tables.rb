class CreateBaseTables < ActiveRecord::Migration[6.0] # rubocop:todo Metrics/ClassLength
  # rubocop:todo Metrics/MethodLength
  def change # rubocop:todo Metrics/AbcSize # rubocop:todo Metrics/MethodLength # rubocop:todo Metrics/MethodLength # rubocop:todo Metrics/MethodLength
    # This file is auto-generated from the current state of the database. Instead
    # of editing this file, please use the migrations feature of Active Record to
    # incrementally modify your database, and then regenerate this schema definition.
    #
    # This file is the source Rails uses to define your schema when running `rails
    # db:schema:load`. When creating a new database, `rails db:schema:load` tends to
    # be faster and is potentially less error prone than running all of your
    # migrations from scratch. Old migrations may fail to apply correctly if those
    # migrations use external dependencies or application code.
    #
    # It's strongly recommended that you check this file into your version control system.

    ActiveRecord::Schema.define(version: 20_200_417_092_714) do # rubocop:todo Metrics/BlockLength

      enable_extension 'plpgsql'
      enable_extension 'unaccent'

      create_table 'countries', force: :cascade do |t|
        t.bigint 'region_id', null: false
        t.string 'name'
        t.string 'icon'
        t.string 'slug'
        t.string 'alpha2'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['alpha2'], name: 'index_countries_on_alpha2', unique: true
        t.index ['name'], name: 'index_countries_on_name', unique: true
        t.index ['region_id'], name: 'index_countries_on_region_id'
        t.index ['slug'], name: 'index_countries_on_slug', unique: true
      end

      create_table 'mission_categories', force: :cascade do |t|
        t.string 'name'
        t.text 'description'
        t.string 'icon'
        t.string 'color'
        t.string 'slug'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['name'], name: 'index_mission_categories_on_name', unique: true
        t.index ['slug'], name: 'index_mission_categories_on_slug', unique: true
      end

      create_table 'mission_skills', force: :cascade do |t|
        t.bigint 'mission_id', null: false
        t.bigint 'skill_id', null: false
        t.boolean 'mandatory', default: true, null: false
        t.integer 'level', default: 1, null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['mission_id'], name: 'index_mission_skills_on_mission_id'
        t.index ['skill_id'], name: 'index_mission_skills_on_skill_id'
      end

      create_table 'mission_users', force: :cascade do |t|
        t.bigint 'mission_id', null: false
        t.bigint 'user_id', null: false
        t.integer 'status', null: false
        t.datetime 'applied_at', null: false
        t.datetime 'accepted_at'
        t.datetime 'rejected_at'
        t.datetime 'completed_at'
        t.datetime 'reviewed_at'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.integer 'match_score'
        t.index ['mission_id'], name: 'index_mission_users_on_mission_id'
        t.index ['user_id'], name: 'index_mission_users_on_user_id'
      end

      create_table 'missions', force: :cascade do |t|
        t.string 'name', null: false
        t.string 'slug', null: false
        t.bigint 'mission_category_id'
        t.boolean 'physical', default: false, null: false
        t.text 'description'
        t.datetime 'begin_at'
        t.datetime 'end_at'
        t.datetime 'due_at'
        t.bigint 'organization_id'
        t.bigint 'workspace_id'
        t.string 'image'
        t.string 'banner_image'
        t.integer 'visibility', default: 0, null: false
        t.datetime 'modified_at', null: false
        t.integer 'modified_by'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.integer 'created_by'
        t.integer 'hiring_validation', default: 0, null: false
        t.integer 'participant_count'
        t.index ['mission_category_id'], name: 'index_missions_on_mission_category_id'
        t.index ['organization_id'], name: 'index_missions_on_organization_id'
        t.index ['workspace_id'], name: 'index_missions_on_workspace_id'
      end

      create_table 'organizations', force: :cascade do |t|
        t.string 'name'
        t.text 'description'
        t.bigint 'region_id', null: false
        t.bigint 'country_id'
        t.integer 'organization_type'
        t.string 'image'
        t.string 'color'
        t.string 'slug'
        t.datetime 'modified_at', null: false
        t.integer 'modified_by'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['country_id'], name: 'index_organizations_on_country_id'
        t.index ['name'], name: 'index_organizations_on_name', unique: true
        t.index ['region_id'], name: 'index_organizations_on_region_id'
        t.index ['slug'], name: 'index_organizations_on_slug', unique: true
      end

      create_table 'priorities', force: :cascade do |t|
        t.string 'name'
        t.string 'color'
        t.bigint 'workspace_id', null: false
        t.integer 'position'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['workspace_id'], name: 'index_priorities_on_workspace_id'
      end

      create_table 'projects', force: :cascade do |t|
        t.string 'name'
        t.text 'description_md'
        t.bigint 'workspace_id', null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['workspace_id'], name: 'index_projects_on_workspace_id'
      end

      create_table 'regions', force: :cascade do |t|
        t.string 'name'
        t.string 'icon'
        t.string 'slug'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['name'], name: 'index_regions_on_name', unique: true
        t.index ['slug'], name: 'index_regions_on_slug', unique: true
      end

      create_table 'skill_categories', force: :cascade do |t|
        t.string 'name'
        t.string 'icon'
        t.string 'color'
        t.string 'slug'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['name'], name: 'index_skill_categories_on_name', unique: true
        t.index ['slug'], name: 'index_skill_categories_on_slug', unique: true
      end

      create_table 'skills', force: :cascade do |t|
        t.string 'name'
        t.text 'description'
        t.string 'icon'
        t.string 'color'
        t.string 'slug'
        t.integer 'parent_id'
        t.bigint 'skill_category_id', null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.bigint 'organization_id'
        t.integer 'skill_type'
        t.integer 'level', null: false
        t.string 'full_name', null: false
        t.text 'tags', default: '', null: false
        t.boolean 'visible', default: false, null: false
        t.integer 'popularity', default: 0, null: false
        t.index ['name'], name: 'index_skills_on_name', unique: true
        t.index ['organization_id'], name: 'index_skills_on_organization_id'
        t.index ['parent_id'], name: 'index_skills_on_parent_id'
        t.index ['skill_category_id'], name: 'index_skills_on_skill_category_id'
        t.index ['slug'], name: 'index_skills_on_slug', unique: true
      end

      create_table 'tags', force: :cascade do |t|
        t.string 'name'
        t.string 'color'
        t.bigint 'workspace_id', null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['workspace_id'], name: 'index_tags_on_workspace_id'
      end

      create_table 'task_tags', force: :cascade do |t|
        t.bigint 'task_id', null: false
        t.bigint 'tag_id', null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['tag_id'], name: 'index_task_tags_on_tag_id'
        t.index ['task_id'], name: 'index_task_tags_on_task_id'
      end

      create_table 'tasks', force: :cascade do |t|
        t.string 'title'
        t.text 'description_md'
        t.integer 'author_id'
        t.integer 'assignee_id'
        t.bigint 'project_id', null: false
        t.string 'status'
        t.integer 'parent_id'
        t.string 'due_at_datetime'
        t.datetime 'starts_at'
        t.integer 'blocked_by'
        t.bigint 'priority_id', null: false
        t.string 'task_type'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['assignee_id'], name: 'index_tasks_on_assignee_id'
        t.index ['author_id'], name: 'index_tasks_on_author_id'
        t.index ['blocked_by'], name: 'index_tasks_on_blocked_by'
        t.index ['parent_id'], name: 'index_tasks_on_parent_id'
        t.index ['priority_id'], name: 'index_tasks_on_priority_id'
        t.index ['project_id'], name: 'index_tasks_on_project_id'
        t.index ['status'], name: 'index_tasks_on_status'
        t.index ['task_type'], name: 'index_tasks_on_task_type'
      end

      create_table 'user_skills', force: :cascade do |t|
        t.bigint 'user_id', null: false
        t.bigint 'skill_id', null: false
        t.integer 'level', default: 1, null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['skill_id'], name: 'index_user_skills_on_skill_id'
        t.index ['user_id'], name: 'index_user_skills_on_user_id'
      end

      create_table 'users', force: :cascade do |t| # rubocop:todo Metrics/BlockLength
        t.string 'email', default: '', null: false
        t.string 'encrypted_password', default: '', null: false
        t.string 'reset_password_token'
        t.datetime 'reset_password_sent_at'
        t.datetime 'remember_created_at'
        t.integer 'sign_in_count', default: 0, null: false
        t.datetime 'current_sign_in_at'
        t.datetime 'last_sign_in_at'
        t.inet 'current_sign_in_ip'
        t.inet 'last_sign_in_ip'
        t.string 'confirmation_token'
        t.datetime 'confirmed_at'
        t.datetime 'confirmation_sent_at'
        t.string 'unconfirmed_email'
        t.integer 'failed_attempts', default: 0, null: false
        t.string 'unlock_token'
        t.datetime 'locked_at'
        t.string 'username'
        t.string 'image'
        t.string 'first_name'
        t.string 'last_name'
        t.string 'timezone'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.boolean 'admin', default: false, null: false
        t.bigint 'primary_workspace_id'
        t.string 'provider', default: 'email', null: false
        t.string 'uid', default: '', null: false
        t.text 'token'
        t.string 'jti'
        t.string 'slug'
        t.integer 'country_id'
        t.index ['confirmation_token'], name: 'index_users_on_confirmation_token', unique: true
        t.index ['email'], name: 'index_users_on_email', unique: true
        t.index ['jti'], name: 'index_users_on_jti', unique: true
        t.index ['primary_workspace_id'], name: 'index_users_on_primary_workspace_id'
        t.index ['reset_password_token'], name: 'index_users_on_reset_password_token', unique: true
        t.index %w[uid provider], name: 'index_users_on_uid_and_provider', unique: true
        t.index ['unlock_token'], name: 'index_users_on_unlock_token', unique: true
      end

      create_table 'workspace_histories', force: :cascade do |t|
        t.bigint 'workspace_id', null: false
        t.string 'resource_type', null: false
        t.bigint 'resource_id', null: false
        t.text 'payload'
        t.bigint 'user_id'
        t.integer 'change_type', null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index %w[resource_type resource_id], name: 'index_workspace_histories_on_resource_type_and_resource_id'
        t.index ['user_id'], name: 'index_workspace_histories_on_user_id'
        t.index ['workspace_id'], name: 'index_workspace_histories_on_workspace_id'
      end

      create_table 'workspaces', force: :cascade do |t|
        t.string 'name', null: false
        t.string 'slug', null: false
        t.string 'image'
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.bigint 'organization_id'
        t.integer 'users_count', default: 0, null: false
        t.integer 'missions_count', default: 0, null: false
        t.index ['organization_id'], name: 'index_workspaces_on_organization_id'
      end

      create_table 'workspaces_users', force: :cascade do |t|
        t.bigint 'user_id', null: false
        t.bigint 'workspace_id', null: false
        t.string 'role'
        t.boolean 'admin', default: false, null: false
        t.datetime 'created_at', precision: 6, null: false
        t.datetime 'updated_at', precision: 6, null: false
        t.index ['user_id'], name: 'index_workspaces_users_on_user_id'
        t.index ['workspace_id'], name: 'index_workspaces_users_on_workspace_id'
      end

      add_foreign_key 'countries', 'regions'
      add_foreign_key 'mission_skills', 'missions'
      add_foreign_key 'mission_skills', 'skills'
      add_foreign_key 'mission_users', 'missions'
      add_foreign_key 'mission_users', 'users'
      add_foreign_key 'missions', 'mission_categories'
      add_foreign_key 'missions', 'organizations'
      add_foreign_key 'missions', 'workspaces'
      add_foreign_key 'organizations', 'countries'
      add_foreign_key 'organizations', 'regions'
      add_foreign_key 'priorities', 'workspaces'
      add_foreign_key 'projects', 'workspaces'
      add_foreign_key 'skills', 'organizations'
      add_foreign_key 'skills', 'skill_categories'
      add_foreign_key 'skills', 'skills', column: 'parent_id'
      add_foreign_key 'tags', 'workspaces'
      add_foreign_key 'task_tags', 'tags'
      add_foreign_key 'task_tags', 'tasks'
      add_foreign_key 'tasks', 'priorities'
      add_foreign_key 'tasks', 'projects'
      add_foreign_key 'user_skills', 'skills'
      add_foreign_key 'user_skills', 'users'
      add_foreign_key 'users', 'workspaces', column: 'primary_workspace_id'
      add_foreign_key 'workspace_histories', 'users'
      add_foreign_key 'workspace_histories', 'workspaces'
      add_foreign_key 'workspaces', 'organizations'
      add_foreign_key 'workspaces_users', 'users'
      add_foreign_key 'workspaces_users', 'workspaces'
    end
  end
  # rubocop:enable Metrics/MethodLength
end
