class AddServiceAndDurationToAppointments < ActiveRecord::Migration[6.1]
  def change
    add_column :appointments, :service, :string
    add_column :appointments, :duration, :integer
  end
end
