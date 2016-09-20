module Api
    module V1
        module Private
            class UsersController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def datatable
                    render json: UserDatatable.new(view_context, user_filter_params)
                end

                private

                def user_filter_params
                    permitted = params.permit(filter: [:state])
                    if permitted.permitted?
                        permitted[:filter]
                    end
                end

            end
        end
    end
end