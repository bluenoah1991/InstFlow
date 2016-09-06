class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  layout false

  class AccessDenied < StandardError; end

  def current_user
    current_admin
  end

  def current_tenant
    subdomains = Apartment::Elevators::Subdomain.excluded_subdomains
    if request.subdomain.present? && !subdomains.include?(request.subdomain)
      request.subdomains[0]
    end
  end

  def authenticate_tenant!
    unless current_user.present? && current_user.tenant_id == current_tenant
      # TODO Redirect to error page
    end
  end
end
