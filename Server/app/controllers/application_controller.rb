class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  layout false

  class AccessDenied < StandardError; end

  rescue_from(Apartment::TenantNotFound) do |err|
    render plain: 'Tenant not found'
  end

  def current_user
    current_admin
  end

  def own_subdomain
    subdomains = Apartment::Elevators::Subdomain.excluded_subdomains
    if !request.subdomain.present? && subdomains.include?(request.subdomain)
      raise AccessDenied.new
    end
  end
end
