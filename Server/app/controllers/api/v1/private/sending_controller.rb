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

                    raw_hyperlink_message = HyperlinkMessage.find(params[:hyperlink_message_id])
                    @hyperlink_message = raw_hyperlink_message.dup
                    @hyperlink_message.snapshot = true
                    @hyperlink_message.save!

                    @url = mobile_index_url(@hyperlink_message.id)

                    @instance = SendingTask.new
                    @instance.message = @hyperlink_message.title
                    @instance.url = @url
                    @instance.bot_id = params[:bot_id]
                    @instance.hyperlink_message_id = params[:hyperlink_message_id]
                    @instance.target = params[:target]
                    @instance.save!
                    
                    HyperlinkMessageSendSetupJob.perform_later(params[:bot_id], params[:target], @url, @instance.id)

                    render json: @instance
                end

                def direct
                    requires! :message, type: String

                    begin
                        message = BotFramework::Client.send(@bot, @user, params[:message])
                        render json: { ok: 1 }
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
                    permitted = params.permit(filter: [:bot_id, :state])
                    if permitted.permitted?
                        permitted[:filter]
                    end
                end
            end
        end
    end
end