require 'jwt_auth'

class AppointmentsController < ApplicationController
  skip_before_action :check_auth, only: [:create, :update]

  def index
    appointments = @current_user.appointments.includes(:dietitian, :patient)
    render json: appointments, include: [:dietitian, :patient]
  end

  def create
    payload = JSON.parse(request.body.read)

    if payload['event'] == 'invitee.created'
      create_appointment(payload)
    elsif payload['event'] == 'invitee.canceled'
      cancel_appointment(payload)
    else
      render json: { error: 'Unsupported event type' }, status: :unprocessable_entity
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

  def create_appointment(payload)
    # Extract relevant information from the payload
    meet_link = payload['payload']['scheduled_event']['location']['join_url']
    start_time = DateTime.parse(payload['payload']['scheduled_event']['start_time'])
    end_time = DateTime.parse(payload['payload']['scheduled_event']['end_time'])
    service = payload['payload']['scheduled_event']['name']
    event_uri = payload['payload']['event']

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
      event_uri: event_uri,
      status: "active",
      patient: patient,
      dietitian: dietitian
    )

    if appointment.save
      render json: appointment, status: :created
    else
      render json: { error: appointment.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def cancel_appointment(payload)
    # Extract relevant information from the payload
    event_uri = payload['payload']['event']

    # Find the appointment associated with the event_uri
    appointment = Appointment.find_by(event_uri: event_uri)

    if appointment
      # Update the appointment status to 'canceled'
      appointment.update(status: 'canceled')
      render json: appointment, status: :ok
    else
      render json: { error: 'Appointment not found' }, status: :not_found
    end
  end

  def appointment_params
    params.require(:appointment).permit(:start_time, :end_time, :meet_link, :service, :duration, :status, :event_uri)
  end

end
