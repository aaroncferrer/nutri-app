class PatientMailer < ApplicationMailer
  default from: 'arcferrer5@gmail.com'

  def signup_notification(patient)
    @patient = patient
    mail to: @patient.email, subject: 'Welcome to Our App - Signup Confirmation'
  end

  def google_signup(patient, temporary_password)
    @temporary_password = temporary_password
    @patient = patient
    mail to: @patient.email, subject: 'Welcome to Our App - Signup Confirmation'
  end
end
