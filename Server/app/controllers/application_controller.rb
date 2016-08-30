class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user

  layout false

  class AccessDenied < StandardError; end

  def current_user
    current_admin
  end

  def own_subdomain
    subdomains = Apartment::Elevators::Subdomain.excluded_subdomains
    if request.subdomain.present? && !subdomains.include?(request.subdomain)
      if !current_user.present? || request.subdomains[0] != current_user.tenant_id
        raise AccessDenied.new
      end
    end
  end
end
