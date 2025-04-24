# frozen_string_literal: true

class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    identifier = sign_in_params[:identifier]
    if identifier.match? URI::MailTo::EMAIL_REGEXP
      resource = User.find_by(email: identifier)
    else
      resource = User.find_by(mobile_no: identifier)
    end
  render json: {errors: 'user not found'}, status: 401 if resource.nil?
    sign_in(resource, store: false)
    render json: {message: 'user signed in successfully'}, status: :ok
  end
  
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
