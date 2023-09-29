FactoryBot.define do
  factory :appointment do
    meet_schedule { Faker::Time.between(from: DateTime.now, to: DateTime.now + 1.week) }
    meet_link { Faker::Internet.url }
    status { 'pending' }
    dietitian
    patient
  end
end
