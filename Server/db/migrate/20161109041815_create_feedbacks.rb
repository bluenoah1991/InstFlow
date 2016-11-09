class CreateFeedbacks < ActiveRecord::Migration[5.0]
  def change
    create_table :feedbacks do |t|
      t.string :title
      t.string :email
      t.string :content

      t.timestamps
    end
  end
end
