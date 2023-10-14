class PatientMailer < ApplicationMailer
  default from: 'arcferrer5@gmail.com'

  def signup_notification(patient)
    @patient = patient
    mail(to: @patient.email, cc: 'arcferrer5@gmail.com', subject: 'Welcome to Our App - Signup Confirmation')
  end

  def google_signup(patient, temporary_password)
    @temporary_password = temporary_password
    @patient = patient
    mail(to: @patient.email, cc: 'arcferrer5@gmail.com', subject: 'Welcome to Our App - Signup Confirmation')
  end

  # def diet_google_signup(dietitian, temporary_password)
  #   @temporary_password = temporary_password
  #   @dietitian = dietitian
  #   mail(to: @dietitian.email, cc: 'arcferrer5@gmail.com', subject: 'Welcome to Our App - Signup Confirmation')
  # end
end
