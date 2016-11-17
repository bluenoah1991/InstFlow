module Api
    module V1
        class NlMessagesController < Api::V1::ApplicationController
            before_action :set_instance, except: [:incoming, :outgoing]

            def incoming
                requires! :ext_type, type: String
                requires! :msg_id, type: String
                optional! :msg_type, type: String
                optional! :text, type: String
                optional! :source, type: String
                optional! :agent, type: String
                optional! :serviceUrl, type: String
                optional! :user_client_id, type: String
                optional! :user_client_name, type: String
                optional! :bot_client_id, type: String
                optional! :bot_client_name, type: String
                optional! :channel_id, type: String
                optional! :conversation_id, type: String
                optional! :time, type: Integer

                @instance = NlMessage.new
                @instance.bot_id = @current_bot.id
                @instance.ext_type = params[:ext_type]
                @instance.msg_id = params[:msg_id]
                @instance.msg_type = params[:msg_type]
                @instance.text = params[:text]
                @instance.source = params[:source]
                @instance.agent = params[:agent]
                @instance.serviceUrl = params[:serviceUrl]
                @instance.user_client_id = params[:user_client_id]
                @instance.user_client_name = params[:user_client_name]
                @instance.bot_client_id = params[:bot_client_id]
                @instance.bot_client_name = params[:bot_client_name]
                @instance.channel_id = params[:channel_id]
                @instance.conversation_id = params[:conversation_id]
                @instance.orientation = 1
                time_ = params[:time]
                time = Time.at(time_ / 1000, (time_ % 1000) * 1000)
                @instance.time = time
                @instance.save!

                if @instance.ext_type == 'start'
                    convs = Conversation.new
                    convs.bot_id = @current_bot.id
                    convs.latest_message = @instance.text
                    convs.source = @instance.source
                    convs.agent = @instance.agent
                    convs.serviceUrl = @instance.serviceUrl
                    convs.user_client_id = @instance.user_client_id
                    convs.user_client_name = @instance.user_client_name
                    convs.bot_client_id = @instance.bot_client_id
                    convs.bot_client_name = @instance.bot_client_name
                    convs.channel_id = @instance.channel_id
                    convs.conversation_id = @instance.conversation_id
                    convs.start_time = @instance.time
                    convs.latest_active = @instance.time
                    convs.save!
                elsif @instance.ext_type == 'message'
                    convs = Conversation.order(latest_active: :desc).find_by(
                        channel_id: @instance.channel_id, 
                        conversation_id: @instance.conversation_id)
                    if convs.present?
                        convs.latest_message = @instance.text
                        convs.latest_active = @instance.time
                        convs.save!
                    end
                elsif @instance.ext_type == 'close'
                    convs = Conversation.order(latest_active: :desc).find_by(
                        channel_id: @instance.channel_id, 
                        conversation_id: @instance.conversation_id)
                    if convs.present?
                        convs.latest_active = @instance.time
                        convs.close_time = @instance.time
                        convs.closed = true
                        convs.save!
                    end
                end

                # TODO notify admin base on websocket, message queue or email

                render json: @instance
            end

            def outgoing
                @instances = NlMessage.pending

                render json: @instances
            end

            def outgoing_ack
                optional! :conversation_id, type: String
                optional! :state, type: String
                optional! :time, type: Integer

                @instance.conversation_id = params[:conversation_id]
                @instance.state = params[:state]
                @instance.time = params[:time]
                @instance.save!

                # TODO notify admin base on websocket, message queue or email

                render json: @instance
            end

            def show
                render json: @instance
            end

            def destroy
                @instance.destroy
                render json: { ok: 1 }
            end

            def set_instance
                @instance = NlMessage.find(params[:id])
            end
        end
    end
end