class Appointment < ApplicationRecord
  belongs_to :dietitian
  belongs_to :patient
  has_one :record

  validates :start_time, presence: true
  validates :end_time, presence: true
	validates :meet_link, presence: true

  before_validation :calculate_duration

  private

  def calculate_duration
    return unless start_time && end_time

    self.duration = ((self.end_time - self.start_time) / 60).to_i
  end
end
