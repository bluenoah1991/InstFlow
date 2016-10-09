class ExtendAdmins < ActiveRecord::Migration[5.0]
  def change
    add_column :admins, :tenant_id, :string, :null => false, :default => ''
    add_column :admins, :first_name, :string, :null => true
    add_column :admins, :last_name, :string, :null => true
    add_column :admins, :phone_number, :string, :null => true
    add_column :admins, :company_name, :string, :null => true
    add_column :admins, :occupation, :string, :null => true
    add_column :admins, :about, :string, :null => true
    add_column :admins, :website_url, :string, :null => true

    add_index :admins, :tenant_id, unique: true
  end
end
