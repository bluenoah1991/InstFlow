class RescueMiddleware
    def initialize(app)
        @app = app
    end

    def call(env)
        # begin
            response = @app.call(env)
        # rescue ::Apartment::TenantNotFound
        # end
        # response
    end
end