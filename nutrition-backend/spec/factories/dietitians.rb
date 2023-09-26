FactoryBot.define do
  factory :dietitian do
    email { Faker::Internet.email }
    given_name { Faker::Name.first_name }
    family_name { Faker::Name.last_name }
    password { 'password' }
    role { 'patient' }

    trait :without_name do
      given_name { nil }
    end
  end
end
