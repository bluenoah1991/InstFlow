require 'securerandom'

module Api
    module V1
        module Private
            class SendingController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:index, :create]

                def index
                    render json: SendingTaskDatatable.new(view_context, sending_task_filter_params)
                end

                def create
                    requires! :bot_id, type: Integer
                    requires! :hyperlink_message_id, type: Integer
                    requires! :target, type: String

                    @hyperlink_message = HyperlinkMessage.find(params[:hyperlink_message_id])

                    @instance = SendingTask.new
                    @instance.message = @hyperlink_message.title
                    @instance.bot_id = params[:bot_id]
                    @instance.hyperlink_message_id = params[:hyperlink_message_id]
                    @instance.target = params[:target]
                    @instance.save!
                    
                    render json: @instance
                end

                def direct
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
                            message = Message.new
                            message.bot_id = @bot.id
                            message.msg_id = SecureRandom.uuid
                            message.msg_type = 'message'
                            message.text = params['message']
                            message.agent = 'instflow'
                            message.serviceUrl = @user.serviceUrl
                            message.user_client_id = @user.user_client_id
                            message.user_client_name = @user.user_client_name
                            message.bot_client_id = @user.bot_client_id
                            message.bot_client_name = @user.bot_client_name
                            message.channel_id = @user.channel_id
                            message.conversation_id = conversation_id
                            message.orientation = 2
                            message.time = Time.new
                            message.platform = true
                            message.save!
                            render json: { ok: 1 }
                        end
                    rescue ::SwaggerClient::ApiError => e
                        raise BadRequest.new(e)
                    rescue ::TypeError => e
                        raise BadRequest.new(e)
                    end
                end

                private

                def set_instance
                    @user = User.find(params[:id])
                    @bot = Bot.find(@user.bot_id)
                end

                def sending_task_filter_params
                    permitted = params.permit(filter: [:state])
                    if permitted.permitted?
                        permitted[:filter]
                    end
                end
            end
        end
    end
end