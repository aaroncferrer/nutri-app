require 'rails_helper'

RSpec.describe AppointmentsController, type: :request do
  describe "POST /appointments" do
    context "when the event is `invitee.created`" do
      it "creates an appointment" do
        dietitian = FactoryBot.create(:dietitian)
        patient = FactoryBot.create(:patient)

        # Mocked payload
        payload = {
          "event" => "invitee.created",
          "payload" => {
            "scheduled_event" => {
              "location" => {
                "join_url" => "https://meet.google.com/abc-def-ghi"
              },
              "start_time" => "2023-10-15T02:00:00+00:00",
              "end_time" => "2023-10-15T03:00:00+00:00",
              "name" => "Nutri Tech Nutrition Consultation",
              "event_memberships" => [
                {
                  "user_email" => dietitian.email
                }
              ]
            },
            "email" => patient.email
          }
        }

        post "/appointments", params: payload.to_json, headers: { "Content-Type" => "application/json" }

        expect(response).to have_http_status(201)

        expect(response.body).to include(payload["payload"]["scheduled_event"]["location"]["join_url"])
        expect(response.body).to include(payload["payload"]["scheduled_event"]["name"])
      end
    end

    context "when the event is `invitee.canceled`" do
      it "cancels the appointment" do
        appointment = FactoryBot.create(:appointment, event_uri: "https://calendly.com/example/nutrition-consultation/1234567890")

        payload = {
          "event" => "invitee.canceled",
          "payload" => {
            "event" => "https://calendly.com/example/nutrition-consultation/1234567890"
          }
        }

        post "/appointments", params: payload.to_json, headers: { "Content-Type" => "application/json" }

        expect(response).to have_http_status(200)
        expect(response.body).to include("canceled")
      end
    end

    context "when the event type is not supported" do
      it "returns an error" do
        payload = {
          "event" => "unsupported_event_type"
        }

        post "/appointments", params: payload.to_json, headers: { "Content-Type" => "application/json" }

        expect(response).to have_http_status(422)
        expect(response.body).to include("Unsupported event type")
      end
    end
  end
end
