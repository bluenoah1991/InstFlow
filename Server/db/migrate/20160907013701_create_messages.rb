class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :msg_id, null: false
      t.string :text, null: true
      t.string :msg_type, null: true
      t.string :source, null: true
      t.string :agent, null: true
      t.string :user_id, null: true
      t.string :user_name, null: true
      t.string :channel_id, null: true
      t.string :conversation_id, null: true
      t.string :bot_id, null: true
      t.string :bot_name, null: true
      t.integer :orientation
      t.timestamp :time

      t.timestamps
    end
  end
end
