class AddNotesToRecords < ActiveRecord::Migration[7.0]
  def change
    add_column :records, :notes, :string
  end
end