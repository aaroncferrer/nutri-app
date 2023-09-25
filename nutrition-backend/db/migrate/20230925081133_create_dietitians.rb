class CreateDietitians < ActiveRecord::Migration[7.0]
  def change
    create_table :dietitians do |t|
      t.string :email
      t.string :password_digest
      t.string :given_name
      t.string :family_name

      t.timestamps
    end
  end
end
