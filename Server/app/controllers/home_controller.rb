class HomeController < ApplicationController
    before_action :authenticate_admin!, except: [:index]
    before_action :authenticate_tenant!, except: [:index]

    def index
    end
end
