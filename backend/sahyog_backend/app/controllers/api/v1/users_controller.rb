class Api::V1::UsersController < ApplicationController
  def create
    
    render json: {data: 'result', status: :ok}
  end
end
