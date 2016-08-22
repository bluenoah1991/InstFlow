class UserHasManyTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags_users, id: false do |t|
      t.belongs_to :user
      t.belongs_to :tag
    end
  end
end
