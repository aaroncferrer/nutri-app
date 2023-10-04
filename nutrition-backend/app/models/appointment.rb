class Appointment < ApplicationRecord
  belongs_to :dietitian
  belongs_to :patient
  has_one :record

  validates :start_time, presence: true
  validates :end_time, presence: true
	validates :meet_link, presence: true
end
