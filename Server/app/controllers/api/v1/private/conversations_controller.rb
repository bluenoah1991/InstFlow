module Api
    module V1
        module Private
            class ConversationsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def recent
                    requires! :channel_id, type: String
                    requires! :user_client_id, type: String

                    @instances = Conversation.order(latest_active: :desc).limit(3).where(
                        channel_id: params[:channel_id], 
                        user_client_id: params[:user_client_id])
                    render json: @instances, each_serializer: ConversationWithMessagesSerializer
                end

                def create
                    requires! :text, type: String
                    requires! :bot_id, type: Integer
                    requires! :channel_id, type: String
                    requires! :user_client_id, type: String
                    optional! :conversation_id, type: String

                    @user = User.find_by(channel_id: params[:channel_id], user_client_id: params[:user_client_id])
                    @instance = NlMessage.new
                    @instance.msg_id = UUID.new.generate
                    @instance.bot_id = params[:bot_id]
                    @instance.ext_type = 'message'
                    @instance.text = params[:text]
                    @instance.source = 'instflow'
                    @instance.user_client_id = params[:user_client_id]
                    @instance.user_client_name = @user.user_client_name
                    @instance.bot_client_id = @user.bot_client_id
                    @instance.bot_client_name = @user.bot_client_name
                    @instance.channel_id = params[:channel_id]
                    @instance.conversation_id = params[:conversation_id]
                    @instance.serviceUrl = @user.serviceUrl
                    @instance.orientation = 2
                    @instance.state = 'pending'
                    @instance.save!

                    render json: @instance
                end
            end
        end
    end
end