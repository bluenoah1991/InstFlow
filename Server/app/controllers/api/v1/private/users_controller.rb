module Api
    module V1
        module Private
            class UsersController < ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def datatable
                    render json: UserDatatable.new(view_context)
                end

            end
        end
    end
end