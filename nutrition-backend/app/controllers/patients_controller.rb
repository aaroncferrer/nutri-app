require 'jwt_auth'

class PatientsController < ApplicationController
	def show
		patient_with_appointments = {
			user: @current_user,
			appointments: @current_user.appointments
		}
		
		render json: patient_with_appointments
	end

	def update
		patient = Patient.find(params[:id])
		if patient.update(patient_params)
			render json: { message: 'Account information successfully updated' }, status: :ok
		else 
			render json: { errors: patient.errors.full_messages }, status: :unprocessable_entity
		end
	end

	private

	def patient_params 
		params.require(:patient).permit(:given_name, :family_name, :email, :password, :password_confirmation, :age, :height, :gender, :weight)
	end
end
