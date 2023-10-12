require 'jwt_auth'

class AppointmentsController < ApplicationController
  skip_before_action :check_auth, only: :create

  def index
    appointments = @current_user.appointments.includes(:dietitian, :patient)
    render json: appointments, include: [:dietitian, :patient]
  end

  def create
    # Parse the JSON payload from the Calendly webhook
    payload = JSON.parse(request.body.read)

    # Extract relevant information from the payload
    meet_link = payload['payload']['scheduled_event']['location']['join_url']
    start_time = DateTime.parse(payload['payload']['scheduled_event']['start_time'])
    end_time = DateTime.parse(payload['payload']['scheduled_event']['end_time'])
    service = payload['payload']['scheduled_event']['name']


    # Find the patient and dietitian by email
    patient_email = payload['payload']['email']
    dietitian_email = payload['payload']['scheduled_event']['event_memberships'][0]['user_email']

    patient = Patient.find_by(email: patient_email)
    dietitian = Dietitian.find_by(email: dietitian_email)

    # Create the appointment
    appointment = Appointment.new(
      meet_link: meet_link,
      start_time: start_time,
      end_time: end_time,   
      service: service,
      patient: patient,
      dietitian: dietitian
    )

    if appointment.save
      render json: appointment, status: :created
    else
      render json: { error: appointment.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def create_manually
    patient_email = params[:patient_email]
    dietitian_email = params[:dietitian_email]

    patient = Patient.find_by(email: patient_email)
    dietitian = Dietitian.find_by(email: dietitian_email)

    if patient && dietitian
      appointment = Appointment.new(appointment_params.merge(patient: patient, dietitian: dietitian))

      if appointment.save
        render json: appointment, status: :created
      else
        render json: { errors: appointment.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid patient or dietitian email' }, status: :unprocessable_entity
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:start_time, :end_time, :meet_link, :service, :duration)
  end

end
