class AddRoleToDietitians < ActiveRecord::Migration[7.0]
  def change
    add_column :dietitians, :role, :string, default: 'dietitian'
  end
end
