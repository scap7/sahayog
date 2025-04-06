# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)
    if resource.save
      render json: {status: :success, message: "user created successfully"}
    else
      render json: {status: :error, message: resource.errors.full_messages}
    end
  end
  
  private

  def respond_with(resource, _opts = {})
    render json: resource
  end

  # def respond_to_on_destroy
  #   head :no_content
  # end
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
