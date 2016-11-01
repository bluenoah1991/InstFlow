class CreateSendingTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :sending_tasks do |t|
      t.string :message
      t.string :target
      t.integer :total, default: 0
      t.integer :sent, default: 0
      t.integer :state, default: 0 # 0: building, 1: ready, 2: running, 3: finished, -1: failed

      t.timestamps
    end

    add_reference :sending_tasks, :bot, foreign_key: true, null: true
    add_reference :sending_tasks, :hyperlink_message, foreign_key: true, null: true
  end
end
