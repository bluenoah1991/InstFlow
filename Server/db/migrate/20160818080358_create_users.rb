class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :serviceUrl, null: false
      t.string :bot_client_id, null: true
      t.string :bot_client_name, null: true
      t.string :user_client_id, null: false
      t.string :user_client_name, null: true
      t.string :channel_id, null: false
      t.text :extra

      t.timestamps
    end

    add_index :users, [:channel_id, :user_client_id], unique: true
  end
end
