class Appointment < ApplicationRecord
  belongs_to :dietitian
  belongs_to :patient
  has_one :record

  validates :meet_schedule, presence: true
	validates :meet_link, presence: true
	validates :status, presence: true

  enum status: { pending: "pending", done: "done" }
end
