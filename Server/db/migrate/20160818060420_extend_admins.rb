class ExtendAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :admins, :tenant_id, :string, :null => false, :default => ''
    add_index :admins, :tenant_id, unique: true
  end
end
