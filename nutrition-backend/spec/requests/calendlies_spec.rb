require 'rails_helper'

RSpec.describe CalendlyController, type: :controller do
  describe "GET #user_event_types" do
    it "returns a JSON response with event types" do
      # Stub the HTTParty request to avoid making a real API call
      allow(HTTParty).to receive(:get).and_return(
        double(body: '{"event_types": [{"id": "event_type_1", "name": "Meeting"}]}')
      )

      # Simulate the presence of ENV variables
      allow(ENV).to receive(:[]).with('CALENDLY_USER_URI').and_return('user_uri')
      allow(ENV).to receive(:[]).with('CALENDLY_TOKEN').and_return('your_calendly_token')

      get :user_event_types

      expect(response).to have_http_status(:ok)
      parsed_response = JSON.parse(response.body)
      expect(parsed_response['event_types']).to be_an(Array)
      expect(parsed_response['event_types'][0]['id']).to eq('event_type_1')
      expect(parsed_response['event_types'][0]['name']).to eq('Meeting')
    end
  end
end
