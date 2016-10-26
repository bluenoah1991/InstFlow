module Api
    module V1
        module Private
            class SendingController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance

                def create
                    api_instance = ::SwaggerClient::ConversationsApi.new
                    parameters = ::SwaggerClient::ConversationParameters.new
                    begin
                        result = api_instance.conversations_create_conversation(parameters)
                        p result
                    rescue ::SwaggerClient::ApiError => e
                        puts "Exception when calling ConversationsApi->conversations_create_conversation: #{e}"
                    end
                end

                private

                def set_instance
                    @instance = User.find(params[:id])
                end
            end
        end
    end
end