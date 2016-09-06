class HomeController < ApplicationController
    before_action :authenticate_admin!, except: [:index]
    before_action :authenticate_tenant!, except: [:index]

    def index
        render plain: "Welcome to InstFlow!"
    end

    def dashboard
    end

    def api_settings
    end
end
