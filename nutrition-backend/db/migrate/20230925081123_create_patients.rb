class CreatePatients < ActiveRecord::Migration[7.0]
  def change
    create_table :patients do |t|
      t.string :email
      t.string :family_name
      t.string :given_name
      t.integer :age
      t.float :height
      t.string :gender
      t.string :password_digest
      t.float :weight

      t.timestamps
    end
  end
end
