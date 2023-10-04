FactoryBot.define do
  factory :appointment do
    transient do
      appointment_duration { 30 } # Default duration in minutes
    end

    start_time { Faker::Time.between(from: DateTime.now, to: DateTime.now + 1.week) }
    end_time { start_time + appointment_duration.minutes }
    meet_link { Faker::Internet.url }
    dietitian
    patient

    trait :long_duration do
      appointment_duration { 10 }
    end
  end
end
