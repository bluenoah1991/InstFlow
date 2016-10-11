class CreateBots < ActiveRecord::Migration[5.0]
  def change
    create_table :bots do |t|
      t.belongs_to :admin, null: false
      t.string :name, null: false
      t.string :access_token, null: false
      t.boolean :can_view_access_token, default: true
      t.string :ms_appid, null: true
      t.string :ms_appsecret, null: true

      t.timestamps
    end

    add_index :bots, :access_token, unique: true
  end
end
