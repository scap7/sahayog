# frozen_string_literal: true

class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json
  
  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  def respond_to_on_destroy
   if current_user.present?
    render json: {status: 200, message: "logged out successfully"}, status: :ok
   else
    render json: {status: 401, message: "could not find the active session"}, status: :unauthorized
   end
  end
end
