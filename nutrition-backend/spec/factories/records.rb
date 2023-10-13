FactoryBot.define do
  factory :record do
    assessments { Faker::Lorem.paragraph }
    recommendations { Faker::Lorem.paragraph }
    notes { Faker::Lorem.sentence }
  end
end