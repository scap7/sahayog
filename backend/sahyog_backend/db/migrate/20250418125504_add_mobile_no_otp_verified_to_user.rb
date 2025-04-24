class AddMobileNoOtpVerifiedToUser < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :mobile_no, :string
    add_column :users, :otp_verified, :boolean, default: false
    add_index :users, :mobile_no
  end
end
