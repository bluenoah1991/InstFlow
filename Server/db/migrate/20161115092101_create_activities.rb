class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      # message, start_agent, stop_agent, agent_message, user_read_to, platform_read_to, email_agent_message
      t.string :type_, null: false
      t.string :who, null: false
      t.string :body, null: true

      t.timestamps
    end

    add_reference :activities, :bot, foreign_key: true, null: true
  end
end
