class ExtendAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :admins, :tenant_id, :integer
  end
end
