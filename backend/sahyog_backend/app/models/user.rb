class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  def set_otp
    otp = rand(1111...9999)
    p otp, '===========================OTP'
    self.otp_verified = false
    if self.save
      REDIS.setex("otp_#{id}", 15.minutes,  otp)
    end
  end
end
