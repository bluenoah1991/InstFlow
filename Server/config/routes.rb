Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  class TenantdomainConstraint
    def self.matches?(request)
      subdomains = Apartment::Elevators::Subdomain.excluded_subdomains
      request.subdomains[0].present? && !subdomains.include?(request.subdomains[0])
    end
  end

  class MaindomainConstraint
    def self.matches?(request)
      subdomains = Apartment::Elevators::Subdomain.excluded_subdomains
      !request.subdomain.present? || subdomains.include?(request.subdomain)
    end
  end

  # constraints MaindomainConstraint do
    devise_for :admins, controllers: { 
      registrations: "admins/registrations",
      sessions: "admins/sessions" 
    }
  # end

  get 'dashboard', to: "home#dashboard", as: :dashboard, constraints: TenantdomainConstraint
  get 'dashboard/api_settings', to: "home#api_settings", as: :api_settings, constraints: TenantdomainConstraint

  # authenticated :admin do
  #   root 'home#dashboard', as: :authenticated_root
  # end

  # unauthenticated :admin do
  #   root 'home#index', as: :unauthenticated_root
  # end

  root 'home#index', constraints: MaindomainConstraint

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show, :update, :destroy], constraints: TenantdomainConstraint
      resources :tags, only: [:index, :create, :show, :destroy], constraints: TenantdomainConstraint
      resources :messages, only: [:index, :create, :show, :destroy], constraints: TenantdomainConstraint
      namespace :private do
        post 'users', to: "users#datatable", as: :user_datatable, constraints: TenantdomainConstraint
      end
    end
  end
end
