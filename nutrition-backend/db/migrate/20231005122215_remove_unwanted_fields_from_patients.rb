class RemoveUnwantedFieldsFromPatients < ActiveRecord::Migration[6.0]
  def change
    remove_column :patients, :age
    remove_column :patients, :height
    remove_column :patients, :gender
    remove_column :patients, :weight
  end
end
