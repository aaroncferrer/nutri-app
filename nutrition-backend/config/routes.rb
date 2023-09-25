Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'user/google' => 'users#google' # This maps the /user/google route to the UsersController's google action
end
