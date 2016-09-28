module Api
    module V1
        class MessagesController < Api::V1::ApplicationController
            before_action :set_instance, except: [:index, :create]

            def index
                optional! :channel_id, type: String
                optional! :user_id, type: String

                if params[:channel_id].present? && params[:user_id].present?
                    @instances = Message.who(params[:channel_id], params[:user_id])
                else
                    @instances = Message.all
                end

                render json: @instances
            end

            def create
                requires! :msg_id, type: String
                optional! :text, type: String
                optional! :msg_type, type: String
                optional! :source, type: String
                optional! :agent, type: String
                optional! :user_id, type: String
                optional! :user_name, type: String
                optional! :channel_id, type: String
                optional! :conversation_id, type: String
                optional! :bot_id, type: String
                optional! :bot_name, type: String
                optional! :orientation, type: Integer
                optional! :time, type: Integer

                @instance = Message.new
                @instance.msg_id = params[:msg_id]
                @instance.text = params[:text]
                @instance.msg_type = params[:msg_type]
                @instance.source = params[:source]
                @instance.agent = params[:agent]
                @instance.user_id = params[:user_id]
                @instance.user_name = params[:user_name]
                @instance.channel_id = params[:channel_id]
                @instance.conversation_id = params[:conversation_id]
                @instance.bot_id = params[:bot_id]
                @instance.bot_name = params[:bot_name]
                @instance.orientation = params[:orientation]
                time_ = params[:time]
                time = Time.at(time_ / 1000, (time_ % 1000) * 1000)
                @instance.time = time
                @instance.save!

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
                @instance = Message.find(params[:id])
            end
        end
    end
end