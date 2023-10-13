Rails.application.routes.draw do
  # Patient Google OAuth
  post 'patient/google' => 'patient_auth#google' 
  post 'patient/signup', to: 'patient_auth#signup'
  post 'patient/login', to: 'patient_auth#login'

  # Dietitian Google OAuth
  post 'dietitian/google' => 'dietitian_auth#google' 
  post 'dietitian/signup', to: 'dietitian_auth#signup'
  post 'dietitian/login', to: 'dietitian_auth#login'

  # Calendly
  get 'get_user_event_types', to: 'calendly#user_event_types'

  # Appointments
  resources :appointments, only: [:index, :create]
  post '/appointments/create_manually', to: 'appointments#create_manually'

  # Patients
  resources :patients, only: [:show, :update]

  # Dietitians
  resources :dietitians, only: [:show]

  # Records
  resources :appointments do
    resources :records, only: [:index, :create]
  end

  # Cron
  get 'ping', to: 'cron#ping'
end
