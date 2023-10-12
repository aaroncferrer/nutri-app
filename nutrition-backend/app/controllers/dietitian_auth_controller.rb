require 'jwt_auth'

class DietitianAuthController < ApplicationController
  skip_before_action :check_auth

  def google
    begin
      access_token = params[:token]
      data = Google::Auth::IDTokens.verify_oidc(access_token, aud: ENV['GOOGLE_CLIENT_ID'])

      dietitian = Dietitian.find_by(email: data['email'])

      if dietitian.nil?
        @temporary_password = SecureRandom.hex(12)

        dietitian = Dietitian.new(
          email: data['email'],
          given_name: data['given_name'],
          family_name: data['family_name'],
          password: @temporary_password,
        )

        PatientMailer.google_signup(dietitian, @temporary_password).deliver_now

        unless dietitian.save
          render json: { error: dietitian.errors.full_messages }, status: :unprocessable_entity
          return
        end
      end
      
      token = JwtAuth.encode({ dietitian_id: dietitian.id })
      render json: { token: token, user: dietitian.as_json(only: [:id, :given_name, :family_name, :email, :role]), data: data }, status: :ok

    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def signup
    dietitian = Dietitian.new(dietitian_params)
    if dietitian.save
      render json: dietitian, status: :created
    else
      render json: { errors: dietitian.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    dietitian = Dietitian.find_by(email: params[:email])
    if dietitian&.authenticate(params[:password])
      token = JwtAuth.encode({ dietitian_id: dietitian.id })
      render json: { token: token, user: dietitian.as_json(only: [:id, :given_name, :family_name, :email, :role]) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def dietitian_params
    params.require(:dietitian).permit(:given_name, :family_name, :email, :password, :password_confirmation)
  end
  
end
