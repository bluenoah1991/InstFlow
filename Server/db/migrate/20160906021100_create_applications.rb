class CreateApplications < ActiveRecord::Migration[5.0]
  def change
    create_table :applications do |t|
      t.belongs_to :admin
      t.string :appid, null: false
      t.string :appkey, null: false

      t.timestamps
    end

    add_index :applications, :appid, unique: true
    add_index :applications, :appkey, unique: true
  end
end
