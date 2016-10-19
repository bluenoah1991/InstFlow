module Api
    module V1
        module Private
            class UsersController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:index]

                def index
                    render json: UserDatatable.new(view_context, user_filter_params)
                end

                def show
                    render json: @instance
                end

                def enable
                    @instance.state = 0
                    @instance.save!

                    render json: { ok: 1 }
                end

                def disable
                    @instance.state = -1
                    @instance.save!

                    render json: { ok: 1 }
                end

                private

                def user_filter_params
                    permitted = params.permit(filter: [:state])
                    if permitted.permitted?
                        permitted[:filter]
                    end
                end

                def set_instance
                    @instance = User.find(params[:id])
                end
            end
        end
    end
end