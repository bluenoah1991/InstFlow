class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  layout false

  def current_user
    current_admin
  end

  def own_subdomain
    if !current_user.present? || request.subdomain != current_user.tenant_id
      raise AccessDenied.new
    end
  end
end
