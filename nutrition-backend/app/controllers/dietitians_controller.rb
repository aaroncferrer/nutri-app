class DietitiansController < ApplicationController
  def show
    dietitian_with_appointments = {
      user: @current_user,
      appointments: @current_user.appointments
    }
    render json: dietitian_with_appointments
  end
end
