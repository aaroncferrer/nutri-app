require 'jwt_auth'

class PatientAuthController < ApplicationController
  skip_before_action :check_auth

  def google
    begin
      access_token = params[:token]
      data = Google::Auth::IDTokens.verify_oidc(access_token, aud: ENV['GOOGLE_CLIENT_ID'])

      patient = Patient.find_by(email: data['email'])

      if patient.nil?
        @temporary_password = SecureRandom.hex(12)

        patient = Patient.new(
          email: data['email'],
          given_name: data['given_name'],
          family_name: data['family_name'],
          password: @temporary_password,
        )

        PatientMailer.google_signup(patient, @temporary_password).deliver_now

        unless patient.save
          render json: { error: patient.errors.full_messages }, status: :unprocessable_entity
          return
        end
      end
      
      token = JwtAuth.encode({ patient_id: patient.id })
      render json: { token: token, user: patient.as_json(only: [:id, :given_name, :family_name, :email, :role]), data: data }, status: :ok

    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  def signup
    patient = Patient.new(patient_params)
    if patient.save
      PatientMailer.signup_notification(patient).deliver_now
      render json: patient, status: :created
    else
      render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    patient = Patient.find_by(email: params[:email])
    if patient&.authenticate(params[:password])
      token = JwtAuth.encode({ patient_id: patient.id })
      render json: { token: token, user: patient.as_json(only: [:id, :given_name, :family_name, :email, :role]) }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def patient_params
    params.require(:patient).permit(:given_name, :family_name, :email, :password, :password_confirmation)
  end
  
end
