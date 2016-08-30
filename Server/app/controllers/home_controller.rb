class HomeController < ApplicationController
    before_action :authenticate_admin!, except: [:index]

    def index
        render plain: "Welcome to InstFlow!"
    end

    def dashboard
        if current_user.present? && request.subdomain != current_user.tenant_id
            redirect_to index_url(subdomain: 'www')
        end
    end

    def api_settings
    end
end
