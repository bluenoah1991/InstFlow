class AddTokenToAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :admins, :token, :string
  end
end
