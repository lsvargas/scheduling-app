class ApplicationController < ActionController::API

  def current_user
    User.last
  end
end
