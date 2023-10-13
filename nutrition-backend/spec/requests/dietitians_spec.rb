require 'rails_helper'
require 'jwt_auth'

RSpec.describe DietitiansController, type: :controller do
  describe "GET #show" do
    it "returns a JSON response with dietitian information and appointments" do
      dietitian = FactoryBot.create(:dietitian) 

      token = JwtAuth.encode({ dietitian_id: dietitian.id })
      request.headers['Authorization'] = "Bearer #{token}"

      get :show, params: { id: dietitian.id }

      expect(response).to have_http_status(:ok)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['user']['id']).to eq(dietitian.id)
      expect(parsed_response['appointments']).to eq(dietitian.appointments.as_json)
    end
  end
end
