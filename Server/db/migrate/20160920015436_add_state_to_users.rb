class AddStateToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :state, :integer, :null => false, :default => 0 # 0: enabled, -1: disabled
  end
end
