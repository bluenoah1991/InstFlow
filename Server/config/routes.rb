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

  devise_for :admins, path: 'auth', controllers: { 
    registrations: "admins/registrations",
    sessions: "admins/sessions" 
  }

  get 'mobile/index/:id', to: 'mobile#index', as: :mobile_index, constraints: TenantdomainConstraint

  authenticated :admin do
    get 'dashboard', to: 'home#index', as: :admin_root, constraints: TenantdomainConstraint
  end

  # unauthenticated :admin do
  #   root 'home#index', as: :unauthenticated_root
  # end

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :show, :update, :destroy], constraints: TenantdomainConstraint
      resources :tags, only: [:index, :create, :show, :destroy], constraints: TenantdomainConstraint
      resources :messages, only: [:index, :create, :show, :destroy], constraints: TenantdomainConstraint
      post 'nlmsg/incoming', to: "nl_messages#incoming", as: :nl_message_incoming, constraints: TenantdomainConstraint
      get 'nlmsg/outgoing', to: "nl_messages#outgoing", as: :nl_message_outgoing, constraints: TenantdomainConstraint
      post 'nlmsg/outgoing', to: "nl_messages#outgoing_ack", as: :nl_message_outgoing_ack, constraints: TenantdomainConstraint
      namespace :private do
        post 'dashboard', to: "dashboard#index", as: :dashboard_data, constraints: TenantdomainConstraint
        get 'profile', to: "admins#profile", as: :admin_profile, constraints: TenantdomainConstraint
        post 'profile', to: "admins#update", as: :update_profile, constraints: TenantdomainConstraint
        post 'profile/password', to: "admins#password", as: :update_password, constraints: TenantdomainConstraint
        post 'bots/connect', to: "bots#connect", as: :connect_bot, constraints: TenantdomainConstraint
        get 'bots/:id', to: "bots#show", as: :show_bot, constraints: TenantdomainConstraint
        put 'bots/:id', to: "bots#update", as: :update_bot, constraints: TenantdomainConstraint
        delete 'bots/:id', to: "bots#destroy", as: :delete_bot, constraints: TenantdomainConstraint
        get 'bots', to: "bots#index", as: :bots, constraints: TenantdomainConstraint
        post 'bots', to: "bots#create", as: :create_bot, constraints: TenantdomainConstraint
        get 'users/:id', to: "users#show", as: :show_user, constraints: TenantdomainConstraint
        post 'users/dt', to: "users#index", as: :users, constraints: TenantdomainConstraint
        post 'users/enable', to: "users#enable", as: :enable_user, constraints: TenantdomainConstraint
        post 'users/disable', to: "users#disable", as: :disable_user, constraints: TenantdomainConstraint
        post 'messages/dt', to: "messages#index", as: :messages, constraints: TenantdomainConstraint
        post 'messages/:id', to: "messages#user", as: :user_messages, constraints: TenantdomainConstraint
        post 'send/dt', to: "sending#index", as: :sending_tasks, constraints: TenantdomainConstraint
        post 'send/:id', to: "sending#direct", as: :send_direct_message, constraints: TenantdomainConstraint
        post 'send', to: "sending#create", as: :create_sending_task, constraints: TenantdomainConstraint
        post 'hyperlink_messages/dt', to: "hyperlink_messages#index", as: :hyperlink_messages, constraints: TenantdomainConstraint
        post 'hyperlink_messages', to: "hyperlink_messages#create", as: :create_hyperlink_message, constraints: TenantdomainConstraint
        get 'hyperlink_messages/:id', to: "hyperlink_messages#show", as: :show_hyperlink_message, constraints: TenantdomainConstraint
        put 'hyperlink_messages/:id', to: "hyperlink_messages#update", as: :update_hyperlink_message, constraints: TenantdomainConstraint
        post 'feedback', to: "feedbacks#create", as: :create_feedback, constraints: TenantdomainConstraint
        post 'convs/recent', to: "conversations#recent", as: :recent_convs, constraints: TenantdomainConstraint
        post 'convs/send', to: "conversations#create", as: :send_nl_message, constraints: TenantdomainConstraint
      end
    end
  end
end
