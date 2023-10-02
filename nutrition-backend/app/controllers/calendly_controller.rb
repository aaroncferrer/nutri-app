require 'httparty'

class CalendlyController < ApplicationController
	skip_before_action :check_auth

  def user_event_types
    user_uri = ENV['CALENDLY_USER_URI'] # Specific user URI
    calendly_api_url = "https://api.calendly.com/event_types?user=#{user_uri}"

    headers = {
      'Content-Type' => 'application/json',
      'Authorization' => "Bearer #{ENV['CALENDLY_TOKEN']}"
    }

    response = HTTParty.get(calendly_api_url, headers: headers)
    data = JSON.parse(response.body)

    render json: data
  end
end
