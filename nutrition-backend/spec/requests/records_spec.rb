require 'rails_helper'
require 'jwt_auth'

RSpec.describe RecordsController, type: :controller do
  describe "GET #index" do
    it "returns a JSON response with the record for a given appointment" do
      patient = FactoryBot.create(:patient)
      appointment = FactoryBot.create(:appointment, patient: patient)
      record = FactoryBot.create(:record, appointment: appointment, patient: patient)
      
      token = JwtAuth.encode({ patient_id: patient.id })
      request.headers['Authorization'] = "Bearer #{token}"

      get :index, params: { appointment_id: appointment.id }

      expect(response).to have_http_status(:ok)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['assessments']).to eq(record.assessments)
      expect(parsed_response['recommendations']).to eq(record.recommendations)
      expect(parsed_response['notes']).to eq(record.notes)
    end
  end

  describe "POST #create" do
    it "creates a new record for a given appointment" do
      appointment = FactoryBot.create(:appointment)  
      patient = FactoryBot.create(:patient)  
      record_params = { assessments: "Assessment", recommendations: "Recommendation", notes: "Notes" }

      token = JwtAuth.encode({ patient_id: patient.id })
      request.headers['Authorization'] = "Bearer #{token}"

      post :create, params: { appointment_id: appointment.id, record: record_params }

      expect(response).to have_http_status(:created)
      record = Record.last
      expect(record.assessments).to eq("Assessment")
      expect(record.recommendations).to eq("Recommendation")
      expect(record.notes).to eq("Notes")
    end
  end
end
