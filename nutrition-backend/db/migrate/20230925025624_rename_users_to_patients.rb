class RenameUsersToPatients < ActiveRecord::Migration[6.1]
  def change
    rename_table :users, :patients
  end
end
