require 'jwt_auth'

class RecordsController < ApplicationController
    def index
        appointment = Appointment.find(params[:appointment_id])
        record = appointment.record
        render json: record
    end

    def create
        appointment = Appointment.find(params[:appointment_id])
        patient = appointment.patient
        
        record = Record.new(record_params.merge(appointment: appointment, patient: patient))

        if record.save
            render json: record, status: :created
        else
            render json: { error: record.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
    end

    private

    def record_params
        params.require(:record).permit(:assessments, :recommendations, :notes)
    end
end
