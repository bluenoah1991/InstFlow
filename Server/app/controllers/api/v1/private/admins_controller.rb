module Api
    module V1
        module Private
            class AdminsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def profile
                    render json: current_user
                end
            end
        end
    end
end