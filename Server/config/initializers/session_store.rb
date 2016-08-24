# Be sure to restart your server when you modify this file.

# Rails.application.config.session_store :cookie_store, key: '_Server_session'
Rails.application.config.session_store :cookie_store, key: '_Server_session', domain: {
    production: '.instflow.com',
    development: :all
}.fetch(Rails.env.to_sym, :all)