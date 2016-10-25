class AddBotRefToUsers < ActiveRecord::Migration[5.0]
  def change
    add_reference :users, :bot, foreign_key: true, null: true
    add_reference :messages, :bot, foreign_key: true, null: true
  end
end
