class HomeController < ApplicationController
    def index    
        if current_user.present? && request.subdomain != current_user.tenant_id
            redirect_to root_url(subdomain: current_user.tenant_id)
        else
            render plain: "Welcome to InstFlow!"
        end
    end

    def dashboard
        render :layout => false
    end
end
