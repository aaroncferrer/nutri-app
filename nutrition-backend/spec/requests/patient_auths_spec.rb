require 'rails_helper'

RSpec.describe "PatientAuths", type: :request do
  # POST Google SignIn
  describe "POST /patient/google" do
    it "returns a JWT on successful Google Sign-in" do
      # Mock Google::Auth::IDTokens.verify_oidc method to return a valid user object
      allow(Google::Auth::IDTokens).to receive(:verify_oidc).and_return(FactoryBot.build(:patient))

      
      post "/patient/google", params: { token: "GOOGLE_ACCESS_TOKEN" }
      expect(response).to have_http_status(200)
      expect(response.body).to include("token")
    end

    it "returns an error if the Google access token is invalid" do
      # Mock Google::Auth::IDTokens.verify_oidc method to raise an exception
      allow(Google::Auth::IDTokens).to receive(:verify_oidc).and_raise(StandardError.new('Google access token is invalid'))

      post "/patient/google", params: { token: "INVALID_GOOGLE_ACCESS_TOKEN" }

      expect(response).to have_http_status(422)
      expect(response.body).to include("Google access token is invalid")
    end
  end

  # POST Patient Signup
  describe "POST /patient/signup" do
    it "creates a new patient" do
      patient_params = FactoryBot.attributes_for(:patient)

      post "/patient/signup", params: { patient: patient_params }

      expect(response).to have_http_status(201)
      patient = JSON.parse(response.body)
      expect(patient["email"]).to eq(patient_params[:email])
    end

    it "doesn't create a patient if email is already taken" do
      existing_patient = FactoryBot.create(:patient, email: "taken@mail.com")
      patient_params = FactoryBot.attributes_for(:patient, email: "taken@mail.com")

      post "/patient/signup", params: { patient: patient_params }

      expect(response).to have_http_status(422)
      patient = JSON.parse(response.body)
      expect(patient["errors"]).to include("Email has already been taken")
    end

    it "doesn't create a patient if passwords don't match" do
      patient_params = FactoryBot.attributes_for(:patient, password: "password", password_confirmation: "wrong_password")

      post "/patient/signup", params: { patient: patient_params }

      expect(response).to have_http_status(422)
      patient = JSON.parse(response.body)
      expect(patient["errors"]).to include("Password confirmation doesn't match Password")
    end
  end

  # POST Patient Login
  describe "POST /patient/login" do
    before(:each) do
      @patient = FactoryBot.create(:patient, email: "test@example.com", password: "password")
    end

    it "returns a JWT on successful login" do
      login_params = {
        email: "test@example.com",
        password: "password"
      }

      post "/patient/login", params: login_params

      expect(response).to have_http_status(200)
      expect(response.body).to include("token")
    end

    it "returns an error on failed login" do
      login_params = {
        email: "test@example.com",
        password: "wrong_password"
      }

      post "/patient/login", params: login_params

      expect(response).to have_http_status(401)
      expect(response.body).to include("Invalid email or password")
    end
  end
end
