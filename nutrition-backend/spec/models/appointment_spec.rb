require 'rails_helper'

RSpec.describe Appointment, type: :model do
  it 'is invalid without meet_link' do
    appointment = FactoryBot.build(:appointment, meet_link: nil)
    expect(appointment.save).to be false
  end
end
