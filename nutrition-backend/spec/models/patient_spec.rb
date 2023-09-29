require 'rails_helper'

RSpec.describe Patient, type: :model do
  it "is valid and saved" do
    patient = FactoryBot.build(:patient)
    expect(patient.save).to be true
  end

  it "is not saved because there's no name" do
    patient = FactoryBot.build(:patient, :without_name)
    expect(patient.save).to be false
  end

  it "is not saved because email is already taken" do
    existing_patient = FactoryBot.create(:patient)
    new_patient = Patient.new(given_name: "John", family_name: "Doe", email: existing_patient.email, password: "password", password_confirmation: "password")

    expect(new_patient.save).to be false
  end

  it "is not saved because email is already taken by a dietitian" do
    dietitian = FactoryBot.create(:dietitian)
    patient = FactoryBot.build(:dietitian, email: dietitian.email)

    expect(patient.save).to be false
  end

  it "is not saved because passwords don't match" do
    patient = Patient.new(given_name: "John", family_name: "Doe", email: "john@mail.com", password: "password", password_confirmation: "wrong_password")

    expect(patient.save).to be false
  end
end
