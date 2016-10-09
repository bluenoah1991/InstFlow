class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.belongs_to :admin, null: false
      t.string :name, null: false
      t.string :access_token, null: false
      t.string :ms_appid, null: true
      t.string :ms_appsecret, null: true

      t.timestamps
    end

    add_index :applications, :access_token, unique: true
  end
end
