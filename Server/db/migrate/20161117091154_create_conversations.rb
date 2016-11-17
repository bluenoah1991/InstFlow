class CreateConversations < ActiveRecord::Migration[5.0]
  def change
    create_table :conversations do |t|
      t.string :latest_message, null: true
      t.string :source, null: true
      t.string :agent, null: true
      t.string :serviceUrl, null: true
      t.string :user_client_id, null: true
      t.string :user_client_name, null: true
      t.string :bot_client_id, null: true
      t.string :bot_client_name, null: true
      t.string :channel_id, null: true
      t.string :conversation_id, null: true
      t.boolean :closed, default: false
      t.timestamp :start_time
      t.timestamp :latest_active
      t.timestamp :close_time, null: true

      t.timestamps
    end

    add_reference :conversations, :bot, foreign_key: true, null: true
  end
end
