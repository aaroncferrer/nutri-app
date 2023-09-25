class AddFieldsToPatients < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :family_name, :string
    add_column :patients, :given_name, :string
    add_column :patients, :age, :integer
    add_column :patients, :height, :float
    add_column :patients, :gender, :string
    add_column :patients, :password_digest, :string
  end
end
