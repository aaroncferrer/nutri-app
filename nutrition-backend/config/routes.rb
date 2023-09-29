Rails.application.routes.draw do
  post 'patient/google' => 'patient_auth#google' 
  post 'patient/signup', to: 'patient_auth#signup'
  post 'patient/login', to: 'patient_auth#login'

  post 'dietitian/google' => 'dietitian_auth#google' 
  post 'dietitian/signup', to: 'dietitian_auth#signup'
  post 'dietitian/login', to: 'dietitian_auth#login'

  resources :patients, only: [:update]
end
