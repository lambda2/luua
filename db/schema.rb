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

ActiveRecord::Schema.define(version: 2020_06_04_102915) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "unaccent"

  create_table "ahoy_events", force: :cascade do |t|
    t.bigint "visit_id"
    t.bigint "user_id"
    t.string "name"
    t.jsonb "properties"
    t.datetime "time"
    t.index ["name", "time"], name: "index_ahoy_events_on_name_and_time"
    t.index ["properties"], name: "index_ahoy_events_on_properties", opclass: :jsonb_path_ops, using: :gin
    t.index ["user_id"], name: "index_ahoy_events_on_user_id"
    t.index ["visit_id"], name: "index_ahoy_events_on_visit_id"
  end

  create_table "ahoy_visits", force: :cascade do |t|
    t.string "visit_token"
    t.string "visitor_token"
    t.bigint "user_id"
    t.string "ip"
    t.text "user_agent"
    t.text "referrer"
    t.string "referring_domain"
    t.text "landing_page"
    t.string "browser"
    t.string "os"
    t.string "device_type"
    t.string "country"
    t.string "region"
    t.string "city"
    t.float "latitude"
    t.float "longitude"
    t.string "utm_source"
    t.string "utm_medium"
    t.string "utm_term"
    t.string "utm_content"
    t.string "utm_campaign"
    t.string "app_version"
    t.string "os_version"
    t.string "platform"
    t.datetime "started_at"
    t.index ["user_id"], name: "index_ahoy_visits_on_user_id"
    t.index ["visit_token"], name: "index_ahoy_visits_on_visit_token", unique: true
  end

  create_table "countries", force: :cascade do |t|
    t.bigint "region_id", null: false
    t.string "name"
    t.string "icon"
    t.string "slug"
    t.string "alpha2"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["alpha2"], name: "index_countries_on_alpha2", unique: true
    t.index ["name"], name: "index_countries_on_name", unique: true
    t.index ["region_id"], name: "index_countries_on_region_id"
    t.index ["slug"], name: "index_countries_on_slug", unique: true
  end

  create_table "discussion_categories", force: :cascade do |t|
    t.bigint "workspace_id", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.string "icon"
    t.string "color"
    t.integer "category", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "discussions_count", default: 0, null: false
    t.index ["workspace_id"], name: "index_discussion_categories_on_workspace_id"
  end

  create_table "discussion_readings", force: :cascade do |t|
    t.bigint "discussion_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["discussion_id"], name: "index_discussion_readings_on_discussion_id"
    t.index ["user_id"], name: "index_discussion_readings_on_user_id"
  end

  create_table "discussions", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.integer "visibility", default: 0, null: false
    t.bigint "user_id", null: false
    t.string "resource_type", null: false
    t.bigint "resource_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "messages_count", default: 0, null: false
    t.bigint "discussion_category_id"
    t.datetime "modified_at"
    t.datetime "locked_at"
    t.integer "locked_by"
    t.bigint "root_message_id"
    t.index ["discussion_category_id"], name: "index_discussions_on_discussion_category_id"
    t.index ["resource_type", "resource_id"], name: "index_discussions_on_resource_type_and_resource_id"
    t.index ["root_message_id"], name: "index_discussions_on_root_message_id"
    t.index ["user_id"], name: "index_discussions_on_user_id"
  end

  create_table "message_votes", force: :cascade do |t|
    t.integer "vote", default: 0, null: false
    t.bigint "user_id", null: false
    t.bigint "message_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "workspace_id"
    t.index ["message_id"], name: "index_message_votes_on_message_id"
    t.index ["user_id", "message_id"], name: "index_message_votes_on_user_id_and_message_id", unique: true
    t.index ["user_id"], name: "index_message_votes_on_user_id"
    t.index ["workspace_id"], name: "index_message_votes_on_workspace_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "content"
    t.integer "parent_id"
    t.bigint "user_id", null: false
    t.bigint "discussion_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "root", default: false, null: false
    t.integer "positive_vote_count", default: 0, null: false
    t.integer "negative_vote_count", default: 0, null: false
    t.integer "message_type", default: 0, null: false
    t.text "serialized_content"
    t.index ["discussion_id"], name: "index_messages_on_discussion_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "mission_categories", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "icon"
    t.string "color"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_mission_categories_on_name", unique: true
    t.index ["slug"], name: "index_mission_categories_on_slug", unique: true
  end

  create_table "mission_skills", force: :cascade do |t|
    t.bigint "mission_id", null: false
    t.bigint "skill_id", null: false
    t.boolean "mandatory", default: true, null: false
    t.integer "level", default: 1, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["mission_id"], name: "index_mission_skills_on_mission_id"
    t.index ["skill_id"], name: "index_mission_skills_on_skill_id"
  end

  create_table "mission_users", force: :cascade do |t|
    t.bigint "mission_id", null: false
    t.bigint "user_id", null: false
    t.integer "status", null: false
    t.datetime "applied_at", null: false
    t.datetime "accepted_at"
    t.datetime "rejected_at"
    t.datetime "completed_at"
    t.datetime "reviewed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "match_score"
    t.datetime "canceled_at"
    t.index ["mission_id"], name: "index_mission_users_on_mission_id"
    t.index ["user_id"], name: "index_mission_users_on_user_id"
  end

  create_table "missions", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.bigint "mission_category_id"
    t.boolean "physical", default: false, null: false
    t.text "description"
    t.datetime "begin_at"
    t.datetime "end_at"
    t.datetime "due_at"
    t.bigint "organization_id"
    t.bigint "workspace_id"
    t.string "image"
    t.string "banner_image"
    t.integer "visibility", default: 0, null: false
    t.datetime "modified_at", null: false
    t.integer "modified_by"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "created_by"
    t.integer "hiring_validation", default: 0, null: false
    t.integer "participant_count"
    t.bigint "discussion_id"
    t.integer "status", default: 0, null: false
    t.datetime "started_at"
    t.datetime "completed_at"
    t.datetime "canceled_at"
    t.index ["discussion_id"], name: "index_missions_on_discussion_id"
    t.index ["mission_category_id"], name: "index_missions_on_mission_category_id"
    t.index ["organization_id"], name: "index_missions_on_organization_id"
    t.index ["workspace_id"], name: "index_missions_on_workspace_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "viewed_at"
    t.integer "code"
    t.string "title"
    t.string "content"
    t.string "link"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "mailed_at"
    t.index ["resource_type", "resource_id"], name: "index_notifications_on_resource_type_and_resource_id"
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "region_id", null: false
    t.bigint "country_id"
    t.integer "organization_type"
    t.string "image"
    t.string "color"
    t.string "slug"
    t.datetime "modified_at", null: false
    t.integer "modified_by"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["country_id"], name: "index_organizations_on_country_id"
    t.index ["name"], name: "index_organizations_on_name", unique: true
    t.index ["region_id"], name: "index_organizations_on_region_id"
    t.index ["slug"], name: "index_organizations_on_slug", unique: true
  end

  create_table "poll_options", force: :cascade do |t|
    t.bigint "poll_id", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.string "icon"
    t.text "description"
    t.integer "vote_count", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_poll_options_on_poll_id"
    t.index ["slug", "poll_id"], name: "index_poll_options_on_slug_and_poll_id", unique: true
  end

  create_table "polls", force: :cascade do |t|
    t.bigint "workspace_id", null: false
    t.bigint "discussion_id"
    t.bigint "discussion_category_id"
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.text "description", null: false
    t.string "slug", null: false
    t.integer "authentication", default: 0, null: false
    t.integer "anonymity", default: 0, null: false
    t.integer "visibility", default: 0, null: false
    t.integer "category", default: 0, null: false
    t.integer "poll_type", default: 0, null: false
    t.datetime "begin_at"
    t.datetime "end_at"
    t.datetime "closed_at"
    t.integer "closed_by"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "reveal", default: 0, null: false
    t.integer "vote_count", default: 0, null: false
    t.index ["discussion_category_id"], name: "index_polls_on_discussion_category_id"
    t.index ["discussion_id"], name: "index_polls_on_discussion_id"
    t.index ["user_id"], name: "index_polls_on_user_id"
    t.index ["workspace_id"], name: "index_polls_on_workspace_id"
  end

  create_table "priorities", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.bigint "workspace_id", null: false
    t.integer "position"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["workspace_id"], name: "index_priorities_on_workspace_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "name"
    t.text "description_md"
    t.bigint "workspace_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["workspace_id"], name: "index_projects_on_workspace_id"
  end

  create_table "regions", force: :cascade do |t|
    t.string "name"
    t.string "icon"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_regions_on_name", unique: true
    t.index ["slug"], name: "index_regions_on_slug", unique: true
  end

  create_table "skill_categories", force: :cascade do |t|
    t.string "name"
    t.string "icon"
    t.string "color"
    t.string "slug"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_skill_categories_on_name", unique: true
    t.index ["slug"], name: "index_skill_categories_on_slug", unique: true
  end

  create_table "skill_translations", force: :cascade do |t|
    t.bigint "skill_id", null: false
    t.string "locale", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "name"
    t.string "full_name"
    t.text "description"
    t.index ["locale"], name: "index_skill_translations_on_locale"
    t.index ["skill_id"], name: "index_skill_translations_on_skill_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "icon"
    t.string "color"
    t.string "slug"
    t.integer "parent_id"
    t.bigint "skill_category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "organization_id"
    t.integer "skill_type"
    t.integer "level", null: false
    t.text "tags", default: "", null: false
    t.boolean "visible", default: false, null: false
    t.integer "popularity", default: 0, null: false
    t.index ["organization_id"], name: "index_skills_on_organization_id"
    t.index ["parent_id"], name: "index_skills_on_parent_id"
    t.index ["skill_category_id"], name: "index_skills_on_skill_category_id"
    t.index ["slug"], name: "index_skills_on_slug", unique: true
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.string "color"
    t.bigint "workspace_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["workspace_id"], name: "index_tags_on_workspace_id"
  end

  create_table "task_tags", force: :cascade do |t|
    t.bigint "task_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tag_id"], name: "index_task_tags_on_tag_id"
    t.index ["task_id"], name: "index_task_tags_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "title"
    t.text "description_md"
    t.integer "author_id"
    t.integer "assignee_id"
    t.bigint "project_id", null: false
    t.string "status"
    t.integer "parent_id"
    t.string "due_at_datetime"
    t.datetime "starts_at"
    t.integer "blocked_by"
    t.bigint "priority_id", null: false
    t.string "task_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["assignee_id"], name: "index_tasks_on_assignee_id"
    t.index ["author_id"], name: "index_tasks_on_author_id"
    t.index ["blocked_by"], name: "index_tasks_on_blocked_by"
    t.index ["parent_id"], name: "index_tasks_on_parent_id"
    t.index ["priority_id"], name: "index_tasks_on_priority_id"
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["status"], name: "index_tasks_on_status"
    t.index ["task_type"], name: "index_tasks_on_task_type"
  end

  create_table "user_skills", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.integer "level", default: 1, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["skill_id"], name: "index_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_user_skills_on_user_id"
  end

  create_table "user_votes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "poll_id", null: false
    t.bigint "poll_option_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_user_votes_on_poll_id"
    t.index ["poll_option_id"], name: "index_user_votes_on_poll_option_id"
    t.index ["user_id", "poll_id"], name: "index_user_votes_on_user_id_and_poll_id", unique: true
    t.index ["user_id"], name: "index_user_votes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.string "username"
    t.string "image"
    t.string "first_name"
    t.string "last_name"
    t.string "timezone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "admin", default: false, null: false
    t.bigint "primary_workspace_id"
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.text "token"
    t.string "jti"
    t.string "slug"
    t.integer "country_id"
    t.string "locale", default: "fr", null: false
    t.text "bio"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["primary_workspace_id"], name: "index_users_on_primary_workspace_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "workspace_histories", force: :cascade do |t|
    t.bigint "workspace_id", null: false
    t.string "resource_type", null: false
    t.bigint "resource_id", null: false
    t.text "payload"
    t.bigint "user_id"
    t.integer "change_type", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["resource_type", "resource_id"], name: "index_workspace_histories_on_resource_type_and_resource_id"
    t.index ["user_id"], name: "index_workspace_histories_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_histories_on_workspace_id"
  end

  create_table "workspace_invitations", force: :cascade do |t|
    t.bigint "workspace_id"
    t.bigint "user_id"
    t.string "email"
    t.boolean "send_email", default: false, null: false
    t.bigint "inviter_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["inviter_id"], name: "index_workspace_invitations_on_inviter_id"
    t.index ["user_id"], name: "index_workspace_invitations_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_invitations_on_workspace_id"
  end

  create_table "workspace_requests", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "workspace_id"
    t.integer "status", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_workspace_requests_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_requests_on_workspace_id"
  end

  create_table "workspace_users", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workspace_id", null: false
    t.string "role"
    t.boolean "admin", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_workspace_users_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_users_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name", null: false
    t.string "slug", null: false
    t.string "image"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "organization_id"
    t.integer "users_count", default: 0, null: false
    t.integer "missions_count", default: 0, null: false
    t.text "description"
    t.integer "membership", default: 0, null: false
    t.integer "discussions_count", default: 0, null: false
    t.integer "polls_count", default: 0, null: false
    t.string "website"
    t.bigint "region_id"
    t.bigint "country_id"
    t.index ["country_id"], name: "index_workspaces_on_country_id"
    t.index ["organization_id"], name: "index_workspaces_on_organization_id"
    t.index ["region_id"], name: "index_workspaces_on_region_id"
  end

  add_foreign_key "countries", "regions"
  add_foreign_key "discussion_categories", "workspaces"
  add_foreign_key "discussion_readings", "discussions"
  add_foreign_key "discussion_readings", "users"
  add_foreign_key "discussions", "discussion_categories"
  add_foreign_key "discussions", "messages", column: "root_message_id"
  add_foreign_key "discussions", "users"
  add_foreign_key "message_votes", "messages"
  add_foreign_key "message_votes", "users"
  add_foreign_key "message_votes", "workspaces"
  add_foreign_key "messages", "discussions"
  add_foreign_key "messages", "users"
  add_foreign_key "mission_skills", "missions"
  add_foreign_key "mission_skills", "skills"
  add_foreign_key "mission_users", "missions"
  add_foreign_key "mission_users", "users"
  add_foreign_key "missions", "discussions"
  add_foreign_key "missions", "mission_categories"
  add_foreign_key "missions", "organizations"
  add_foreign_key "missions", "workspaces"
  add_foreign_key "notifications", "users"
  add_foreign_key "organizations", "countries"
  add_foreign_key "organizations", "regions"
  add_foreign_key "poll_options", "polls"
  add_foreign_key "polls", "discussion_categories"
  add_foreign_key "polls", "discussions"
  add_foreign_key "polls", "users"
  add_foreign_key "polls", "workspaces"
  add_foreign_key "priorities", "workspaces"
  add_foreign_key "projects", "workspaces"
  add_foreign_key "skills", "organizations"
  add_foreign_key "skills", "skill_categories"
  add_foreign_key "skills", "skills", column: "parent_id"
  add_foreign_key "tags", "workspaces"
  add_foreign_key "task_tags", "tags"
  add_foreign_key "task_tags", "tasks"
  add_foreign_key "tasks", "priorities"
  add_foreign_key "tasks", "projects"
  add_foreign_key "user_skills", "skills"
  add_foreign_key "user_skills", "users"
  add_foreign_key "user_votes", "poll_options"
  add_foreign_key "user_votes", "polls"
  add_foreign_key "user_votes", "users"
  add_foreign_key "users", "workspaces", column: "primary_workspace_id"
  add_foreign_key "workspace_histories", "users"
  add_foreign_key "workspace_histories", "workspaces"
  add_foreign_key "workspace_invitations", "users"
  add_foreign_key "workspace_invitations", "users", column: "inviter_id"
  add_foreign_key "workspace_invitations", "workspaces"
  add_foreign_key "workspace_requests", "users"
  add_foreign_key "workspace_requests", "workspaces"
  add_foreign_key "workspace_users", "users"
  add_foreign_key "workspace_users", "workspaces"
  add_foreign_key "workspaces", "countries"
  add_foreign_key "workspaces", "organizations"
  add_foreign_key "workspaces", "regions"
end
