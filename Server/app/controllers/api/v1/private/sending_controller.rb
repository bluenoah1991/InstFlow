module Api
    module V1
        module Private
            class SendingController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance

                def create
                    requires! :message, type: String

                    configuration = ::SwaggerClient::Configuration.new
                    configuration.host = @user.serviceUrl
                    configuration.access_token = BotFramework::Auth.connect(@bot.ms_appid, @bot.ms_appsecret)['access_token']
                    api_client = ::SwaggerClient::ApiClient.new(configuration)
                    api_instance = ::SwaggerClient::ConversationsApi.new(api_client)
                    parameters = ::SwaggerClient::ConversationParameters.new({
                        :bot => { id: @user.bot_client_id, name: @user.bot_client_name },
                        :members => [
                            { id: @user.user_client_id, name: @user.user_client_name }
                        ]
                    })
                    begin
                        result = api_instance.conversations_create_conversation(parameters)
                        conversation_id = result.id
                        if conversation_id.present?
                            activity = ::SwaggerClient::Activity.new({
                                :type => 'message',
                                :text => params['message'],
                                :from => {
                                    id: @user.bot_client_id, name: @user.bot_client_name
                                },
                                :recipient => {
                                    id: @user.user_client_id, name: @user.user_client_name
                                }
                            })
                            api_instance.conversations_send_to_conversation(activity, conversation_id)
                            render json: { ok: 1 }
                        end
                    rescue ::SwaggerClient::ApiError => e
                        raise BadRequest.new(e)
                    end
                end

                private

                def set_instance
                    @user = User.find(params[:id])
                    @bot = Bot.find(@user.bot_id)
                end
            end
        end
    end
end