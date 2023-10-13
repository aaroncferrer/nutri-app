class AddEventUriToAppointments < ActiveRecord::Migration[7.0]
  def change
    add_column :appointments, :event_uri, :string
  end
end
