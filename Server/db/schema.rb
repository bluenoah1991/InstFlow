# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161117091154) do

  create_table "admins", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "tenant_id",              default: "", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone_number"
    t.string   "company_name"
    t.string   "occupation"
    t.string   "about"
    t.string   "website_url"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["tenant_id"], name: "index_admins_on_tenant_id", unique: true
  end

  create_table "bots", force: :cascade do |t|
    t.integer  "admin_id",                     null: false
    t.string   "name",                         null: false
    t.string   "access_token",                 null: false
    t.string   "ms_appid"
    t.string   "ms_appsecret"
    t.boolean  "connected",    default: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["access_token"], name: "index_bots_on_access_token", unique: true
    t.index ["admin_id"], name: "index_bots_on_admin_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.string   "latest_message"
    t.string   "source"
    t.string   "agent"
    t.string   "serviceUrl"
    t.string   "user_client_id"
    t.string   "user_client_name"
    t.string   "bot_client_id"
    t.string   "bot_client_name"
    t.string   "channel_id"
    t.string   "conversation_id"
    t.boolean  "closed",           default: false
    t.datetime "start_time"
    t.datetime "latest_active"
    t.datetime "close_time"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "bot_id"
    t.index ["bot_id"], name: "index_conversations_on_bot_id"
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string   "title"
    t.string   "email"
    t.string   "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hyperlink_messages", force: :cascade do |t|
    t.string   "cover",                      null: false
    t.string   "title",                      null: false
    t.string   "author",                     null: false
    t.text     "content",                    null: false
    t.boolean  "sent",       default: false
    t.boolean  "snapshot",   default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "bot_id"
    t.index ["bot_id"], name: "index_hyperlink_messages_on_bot_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string   "msg_id",                           null: false
    t.string   "msg_type"
    t.string   "text"
    t.string   "source"
    t.string   "agent"
    t.string   "serviceUrl"
    t.string   "user_client_id"
    t.string   "user_client_name"
    t.string   "bot_client_id"
    t.string   "bot_client_name"
    t.string   "channel_id"
    t.string   "conversation_id"
    t.boolean  "platform",         default: false
    t.integer  "orientation"
    t.datetime "time"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "bot_id"
    t.index ["bot_id"], name: "index_messages_on_bot_id"
  end

  create_table "nl_messages", force: :cascade do |t|
    t.string   "ext_type",         null: false
    t.string   "msg_id",           null: false
    t.string   "msg_type"
    t.string   "text"
    t.string   "source"
    t.string   "agent"
    t.string   "serviceUrl"
    t.string   "user_client_id"
    t.string   "user_client_name"
    t.string   "bot_client_id"
    t.string   "bot_client_name"
    t.string   "channel_id"
    t.string   "conversation_id"
    t.integer  "orientation"
    t.string   "state"
    t.datetime "time"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.integer  "bot_id"
    t.index ["bot_id"], name: "index_nl_messages_on_bot_id"
  end

  create_table "sending_tasks", force: :cascade do |t|
    t.string   "message"
    t.string   "url"
    t.string   "target"
    t.integer  "total",                default: 0
    t.integer  "sent",                 default: 0
    t.integer  "fail",                 default: 0
    t.integer  "state",                default: 0
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.integer  "bot_id"
    t.integer  "hyperlink_message_id"
    t.index ["bot_id"], name: "index_sending_tasks_on_bot_id"
    t.index ["hyperlink_message_id"], name: "index_sending_tasks_on_hyperlink_message_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string   "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags_users", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "tag_id"
    t.index ["tag_id"], name: "index_tags_users_on_tag_id"
    t.index ["user_id"], name: "index_tags_users_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "serviceUrl",                   null: false
    t.string   "bot_client_id"
    t.string   "bot_client_name"
    t.string   "user_client_id",               null: false
    t.string   "user_client_name"
    t.string   "channel_id",                   null: false
    t.text     "extra"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "state",            default: 0, null: false
    t.integer  "bot_id"
    t.index ["bot_id"], name: "index_users_on_bot_id"
    t.index ["channel_id", "user_client_id"], name: "index_users_on_channel_id_and_user_client_id", unique: true
  end

end
