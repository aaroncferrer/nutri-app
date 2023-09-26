class AddRoleToPatients < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :role, :string, default: 'patient'
  end
end
