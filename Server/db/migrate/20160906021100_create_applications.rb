class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.belongs_to :admin
      t.string :name, null: false
      t.string :appid, null: false
      t.string :appkey, null: false
      t.string :ms_appid, null: true
      t.string :ms_appsecret, null: true

      t.timestamps
    end

    add_index :applications, :appid, unique: true
  end
end
