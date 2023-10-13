require 'rails_helper'
require 'jwt_auth'

RSpec.describe PatientsController, type: :controller do
  describe "GET #show" do
    it "returns a JSON response with patient information and appointments" do
      patient = FactoryBot.create(:patient) 

      token = JwtAuth.encode({ patient_id: patient.id })
      request.headers['Authorization'] = "Bearer #{token}"

      get :show, params: { id: patient.id }

      expect(response).to have_http_status(:ok)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['user']['id']).to eq(patient.id)
      expect(parsed_response['appointments']).to eq(patient.appointments.as_json)
    end

    it "returns 'Invalid token or user not found' error with wrong email in the token" do
      token = JwtAuth.encode({ patient_id: 123, email: 'wrong_email@example.com' })
      request.headers['Authorization'] = "Bearer #{token}"

      get :show, params: { id: 123 }

      expect(response).to have_http_status(:unauthorized)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq('Invalid token or user not found')
    end

    it "returns 'Authorization token missing' error when no token is provided" do
      get :show, params: { id: 123 }

      expect(response).to have_http_status(:unauthorized)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['error']).to eq('Authorization token missing')
    end
  end

  describe "PATCH #update" do
    it "updates the patient's account information" do
      patient = FactoryBot.create(:patient)  
      new_attributes = { given_name: 'Updated Name' }

      token = JwtAuth.encode({ patient_id: patient.id })
      request.headers['Authorization'] = "Bearer #{token}"

      patch :update, params: { id: patient.id, patient: new_attributes }

      expect(response).to have_http_status(:ok)
      expect(patient.reload.given_name).to eq('Updated Name')
    end

    it "returns errors if the update is invalid" do
      patient = FactoryBot.create(:patient)  
      invalid_attributes = { given_name: nil }

      token = JwtAuth.encode({ patient_id: patient.id })
      request.headers['Authorization'] = "Bearer #{token}"

      patch :update, params: { id: patient.id, patient: invalid_attributes }

      expect(response).to have_http_status(:unprocessable_entity)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['errors']).to include("Given name can't be blank")
    end
  end
end
