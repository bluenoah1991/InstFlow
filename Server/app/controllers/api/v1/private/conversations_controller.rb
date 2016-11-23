module Api
    module V1
        module Private
            class ConversationsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def recent
                    requires! :channel_id, type: String
                    requires! :user_client_id, type: String
                    optional! :time, type: Integer

                    if params[:time].present? && params[:time] > 0
                        time = Time.at(params[:time] + 1).to_datetime
                        @instances = NlMessage.order(time: :desc).where('time > ? and channel_id = ? and user_client_id = ?', 
                            time, params[:channel_id], params[:user_client_id])
                    else
                        @instances = NlMessage.order(time: :desc).limit(15).where('channel_id = ? and user_client_id = ?', 
                            params[:channel_id], params[:user_client_id])
                    end
                    convs = Conversation.order(latest_active: :desc).find_by('channel_id = ? and user_client_id = ?', 
                            params[:channel_id], params[:user_client_id])

                    render json: {
                        conversation: convs,
                        messages: ActiveModelSerializers::SerializableResource.new(@instances, each_serializer: NlMessageSerializer)
                    }
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