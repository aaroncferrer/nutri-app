class ChangeDefaultStatusForAppointments < ActiveRecord::Migration[7.0]
  def change
    change_column_default :appointments, :status, 'pending'
  end
end
