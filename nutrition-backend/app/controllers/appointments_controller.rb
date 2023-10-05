class AppointmentsController < ApplicationController
  skip_before_action :check_auth

  def create
    # Parse the JSON payload from the Calendly webhook
    payload = JSON.parse(request.body.read)

    # Extract relevant information from the payload
    meet_link = payload['payload']['scheduled_event']['location']['join_url']
    start_time = DateTime.parse(payload['payload']['scheduled_event']['start_time'])
    end_time = DateTime.parse(payload['payload']['scheduled_event']['end_time'])

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
      patient: patient,
      dietitian: dietitian
    )

    if appointment.save
      render json: appointment, status: :created
    else
      render json: { error: appointment.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # ...
end
