class AddWeightColumnToPatient < ActiveRecord::Migration[7.0]
  def change
    add_column :patients, :weight, :float
  end
end
