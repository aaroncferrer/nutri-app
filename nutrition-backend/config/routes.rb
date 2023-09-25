Rails.application.routes.draw do
  post 'patient/google' => 'patient_auth#google' 
  post 'patient/signup', to: 'patient_auth#signup'
  post 'patient/login', to: 'patient_auth#login'

  resources :patients, only: [:update]
end
