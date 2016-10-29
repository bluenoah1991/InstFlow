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
  get 'mobile/index', to: 'mobile#index', as: :mobile_index, constraints: TenantdomainConstraint

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
        get 'profile', to: "admins#profile", as: :admin_profile, constraints: TenantdomainConstraint
        post 'profile', to: "admins#update", as: :update_profile, constraints: TenantdomainConstraint
        post 'profile/password', to: "admins#password", as: :update_password, constraints: TenantdomainConstraint
        post 'bots/connect', to: "bots#connect", as: :connect_bot, constraints: TenantdomainConstraint
        get 'bots/:id', to: "bots#show", as: :show_bot, constraints: TenantdomainConstraint
        put 'bots/:id', to: "bots#update", as: :update_bot, constraints: TenantdomainConstraint
        delete 'bots/:id', to: "bots#destroy", as: :delete_bot, constraints: TenantdomainConstraint
        get 'bots', to: "bots#index", as: :bots, constraints: TenantdomainConstraint
        post 'bots', to: "bots#create", as: :new_bot, constraints: TenantdomainConstraint
        get 'users/:id', to: "users#show", as: :show_user, constraints: TenantdomainConstraint
        post 'users', to: "users#index", as: :users, constraints: TenantdomainConstraint
        post 'users/enable', to: "users#enable", as: :enable_user, constraints: TenantdomainConstraint
        post 'users/disable', to: "users#disable", as: :disable_user, constraints: TenantdomainConstraint
        post 'messages/:id', to: "messages#index", as: :user_messages, constraints: TenantdomainConstraint
        post 'messages', to: "messages#index", as: :messages, constraints: TenantdomainConstraint
        post 'send/:id', to: "sending#create", as: :send_direct_message, constraints: TenantdomainConstraint
        post 'hyperlink_messages', to: "hyperlink_messages#create", as: :create_hyperlink_message, constraints: TenantdomainConstraint
      end
    end
  end
end
