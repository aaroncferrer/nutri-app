class ApplicationController < ActionController::API
  before_action :check_auth

  def check_auth
    token = request.headers['Authorization']&.split(' ')&.last
    if token
      begin
        decoded_token = JwtAuth.decode(token)
        patient_id = decoded_token['patient_id']
        dietitian_id = decoded_token['dietitian_id']

        if patient_id
          @current_user = Patient.find(patient_id)
        elsif dietitian_id
          @current_user = Dietitian.find(dietitian_id)
        end
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Invalid token or user not found' }, status: :unauthorized
      end
    else
      render json: { error: 'Authorization token missing' }, status: :unauthorized
    end
  end
end