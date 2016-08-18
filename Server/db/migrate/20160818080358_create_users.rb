class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :channel_id, null: false
      t.string :user_id, null: false
      t.string :name
      t.text :extra

      t.timestamps
    end

    add_index :users, :channel_id, unique: true
    add_index :users, :user_id, unique: true
  end
end
