# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def google
    begin
			access_token = params[:token]
      data = Google::Auth::IDTokens.verify_oidc(access_token, aud: "1097164830695-qu5q175nq3r8bc5qvgo180n3lkvt1p8o.apps.googleusercontent.com")

      # Find the user in the data (e.g., by email)
      user = User.find_by(email: data['email'])

      if user.nil?
        # If the user doesn't exist, create a new user
        user = User.create(
          email: data['email'],
          name: data['name'],
          # Add other relevant user attributes
        )
      end

      # Sign the user in (based on your authentication method)
      # Example: sign_in(user)

      render json: { message: 'User signed in successfully', user: user, data: data }
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end

  # Other actions (index, show, create, etc.) can be added as needed
end
