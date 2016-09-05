
Rails.application.config.middleware.insert_before 'Apartment::Elevators::Subdomain', 'RescueMiddleware'