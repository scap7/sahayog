# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    identifier = sign_up_params[:identifier]
    password = "#{identifier}_password"
    if identifier.match? URI::MailTo::EMAIL_REGEXP
      user_params = sign_up_params.merge(email: identifier, password: password)
    else
      user_params = sign_up_params.merge(mobile_no: identifier, password: password)
    end
    user_params.delete(:identifier)
    build_resource(user_params)

    if resource.set_otp
      render json: {status: :success, message: "please verify otp", id: resource.id}, status: :ok
    else
      render json: { errors: resource.errors }, status: :unprocessable_entity
    end
  end

  def verify_otp
    resource = User.find(params[:id])
    otp = params[:otp]
    redis_otp = REDIS.get("otp_#{resource.id}")
    if otp == redis_otp
      resource.update(otp_verified: true)
      token = Warden::JWTAuth::UserEncoder.new.call(
        resource, :user, nil
      ).first
      render json: {message: "Set Password", token: token}, status: :ok
    else
      render json: {errors: "OTP does not match"}, status: :unprocessable_entity
    end
  end

  def set_password  
    @user = current_user
    if @user.update(password: params[:password])
      render json: {message: 'Password set successfully'}, status: :ok
    else
      render json: {errors: @user.errors}
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
    devise_parameter_sanitizer.sanitize(:sign_up)
  end
end
