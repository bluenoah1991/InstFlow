module Api
    module V1
        module Private
            class HyperlinkMessagesController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:create]

                def create
                    requires! :bot_id, type: Integer
                    requires! :title, type: String
                    requires! :author, type: String
                    requires! :content, type: String
                    requires! :cover, type: String

                    @instance = HyperlinkMessage.new
                    @instance.bot_id = params[:bot_id]
                    @instance.title = params[:title]
                    @instance.author = params[:author]
                    @instance.content = params[:content]
                    @instance.cover = params[:cover]
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
                    @instance = HyperlinkMessage.find(params[:id])
                end
            end
        end
    end
end