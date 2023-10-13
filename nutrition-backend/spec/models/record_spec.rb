require 'rails_helper'

RSpec.describe Record, type: :model do
  let(:patient) { FactoryBot.create(:patient) }
  let(:appointment) { FactoryBot.create(:appointment) }

  it "is valid with valid attributes" do
    record = Record.new(patient: patient, appointment: appointment)
    expect(record).to be_valid
  end

  it "is not valid without a patient" do
    record = Record.new(appointment: appointment)
    expect(record).to_not be_valid
  end

  it "is not valid without an appointment" do
    record = Record.new(patient: patient)
    expect(record).to_not be_valid
  end

  it "is associated with a patient" do
    record = Record.new(patient: patient, appointment: appointment)
    expect(record.patient).to eq(patient)
  end

  it "is associated with an appointment" do
    record = Record.new(patient: patient, appointment: appointment)
    expect(record.appointment).to eq(appointment)
  end
end
