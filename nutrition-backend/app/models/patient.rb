class Patient < ApplicationRecord
  has_many :appointments
  has_many :records
  has_many :dietitians, through: :appointments

  validates :given_name, presence: true
	validates :family_name, presence: true
	validates :email, presence: true, uniqueness: true
	validates :password, presence: true, confirmation: true, on: :create

	has_secure_password

	# validate :unique_email_across_models, on: :create

	# private

	# def unique_email_across_models
	# 		if Dietitian.exists?(email: email) || Patient.exists?(email: email)
	# 				errors.add(:email, 'is already taken')
	# 		end
	# end
end