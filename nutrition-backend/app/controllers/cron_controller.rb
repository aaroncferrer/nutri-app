class CronController < ApplicationController
	skip_before_action :check_auth

  def ping
    render json: { message: 'Server is alive' }
  end
end
