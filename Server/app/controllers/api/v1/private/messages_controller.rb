module Api
    module V1
        module Private
            class MessagesController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def index
                    render json: MessageDatatable.new(view_context, message_filter_params)
                end

                private

                def message_filter_params
                    permitted = params.permit(:id, filter: [:bot_id, :orientation])
                    if permitted.permitted?
                        filter = permitted[:filter]
                        filter = {} if filter.nil?
                        if permitted[:id].present?
                            user = User.find(permitted[:id])
                            filter[:user_client_id] = user.user_client_id
                            filter[:channel_id] = user.channel_id
                        end
                        filter
                    end
                end

            end
        end
    end
end