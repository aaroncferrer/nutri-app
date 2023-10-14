require 'rails_helper'

RSpec.describe "DietitianAuths", type: :request do
  # POST Google SignIn
  describe "POST /dietitian/google" do
    it "returns a JWT on successful Google Sign-in" do
      # Mock Google::Auth::IDTokens.verify_oidc method to return a valid user object
      allow(Google::Auth::IDTokens).to receive(:verify_oidc).and_return(FactoryBot.build(:dietitian))

      
      post "/dietitian/google", params: { token: "GOOGLE_ACCESS_TOKEN" }
      expect(response).to have_http_status(200)
      expect(response.body).to include("token")
    end

    it "returns an error if the Google access token is invalid" do
      # Mock Google::Auth::IDTokens.verify_oidc method to raise an exception
      allow(Google::Auth::IDTokens).to receive(:verify_oidc).and_raise(StandardError.new('Google access token is invalid'))

      post "/dietitian/google", params: { token: "INVALID_GOOGLE_ACCESS_TOKEN" }

      expect(response).to have_http_status(422)
      expect(response.body).to include("Google access token is invalid")
    end
  end

  # POST Dietitian Signup
  describe "POST /dietitian/signup" do
    it "creates a new dietitian" do
      dietitian_params = FactoryBot.attributes_for(:dietitian)

      post "/dietitian/signup", params: { dietitian: dietitian_params }

      expect(response).to have_http_status(201)
      dietitian = JSON.parse(response.body)
      expect(dietitian["email"]).to eq(dietitian_params[:email])
    end

    it "doesn't create a dietitian if email is already taken" do
      existing_dietitian = FactoryBot.create(:dietitian, email: "taken@mail.com")
      dietitian_params = FactoryBot.attributes_for(:dietitian, email: "taken@mail.com")

      post "/dietitian/signup", params: { dietitian: dietitian_params }

      expect(response).to have_http_status(422)
      dietitian = JSON.parse(response.body)
      expect(dietitian["errors"]).to include("Email has already been taken")
    end

    it "doesn't create a dietitian if passwords don't match" do
      dietitian_params = FactoryBot.attributes_for(:dietitian, password: "password", password_confirmation: "wrong_password")

      post "/dietitian/signup", params: { dietitian: dietitian_params }

      expect(response).to have_http_status(422)
      dietitian = JSON.parse(response.body)
      expect(dietitian["errors"]).to include("Password confirmation doesn't match Password")
    end
  end

  # POST Dietitian Login
  describe "POST /dietitian/login" do
    before(:each) do
      @dietitian = FactoryBot.create(:dietitian, email: "test@example.com", password: "password")
    end

    it "returns a JWT on successful login" do
      login_params = {
        email: "test@example.com",
        password: "password"
      }

      post "/dietitian/login", params: login_params

      expect(response).to have_http_status(200)
      expect(response.body).to include("token")
    end

    it "returns an error on failed login" do
      login_params = {
        email: "test@example.com",
        password: "wrong_password"
      }

      post "/dietitian/login", params: login_params

      expect(response).to have_http_status(401)
      expect(response.body).to include("Invalid email or password")
    end
  end
end
