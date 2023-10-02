class RemoveMeetScheduleAndAddStartEndTimesToAppointments < ActiveRecord::Migration[7.0]
  def change
    remove_column :appointments, :meet_schedule
    add_column :appointments, :start_time, :datetime
    add_column :appointments, :end_time, :datetime
  end
end
