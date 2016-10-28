class CreateHyperlinkMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :hyperlink_messages do |t|
      t.string :cover, null: false
      t.string :title, null: false
      t.string :author, null: false
      t.string :content, null: false
      t.boolean :sent, default: false
    end

    add_reference :hyperlink_messages, :bot, foreign_key: true, null: true
  end
end
