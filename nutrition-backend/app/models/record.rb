class Record < ApplicationRecord
  belongs_to :patient
  belongs_to :appointment
end
