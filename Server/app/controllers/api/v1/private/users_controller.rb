module Api
    module V1
        module Private
            class UsersController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def show
                    render json: UserDatatable.new(view_context, user_filter_params)
                end

                def enable
                    optional! :id, type: Integer

                    @user = User.find(params[:id])
                    @user.state = 0
                    @user.save!

                    render json: { ok: 1 }
                end

                def disable
                    optional! :id, type: Integer

                    @user = User.find(params[:id])
                    @user.state = -1
                    @user.save!

                    render json: { ok: 1 }
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