require 'rails_helper'

RSpec.describe Appointment, type: :model do
  it 'is invalid without meet_schedule' do
    appointment = FactoryBot.build(:appointment, meet_schedule: nil)
    expect(appointment.save).to be false
  end

  it 'has a default status of "pending"' do
    appointment = FactoryBot.create(:appointment)
    expect(appointment.status).to eq('pending')
  end
end
