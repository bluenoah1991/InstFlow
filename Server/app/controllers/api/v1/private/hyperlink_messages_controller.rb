module Api
    module V1
        module Private
            class HyperlinkMessagesController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:index, :create]

                def index
                    render json: HyperlinkMessageDatatable.new(view_context, hyperlink_message_filter_params)
                end

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

                def update
                    optional! :title, type: String
                    optional! :author, type: String
                    optional! :content, type: String
                    optional! :cover, type: String

                    @instance.title = !params[:title].nil? ? params[:title] : @instance.title
                    @instance.author = !params[:author].nil? ? params[:author] : @instance.author
                    @instance.content = !params[:content].nil? ? params[:content] : @instance.content
                    @instance.cover = !params[:cover].nil? ? params[:cover] : @instance.cover
                    @instance.save!

                    render json: @instance
                end

                def destroy
                    @instance.destroy
                    render json: { ok: 1 }
                end

                private

                def set_instance
                    @instance = HyperlinkMessage.find(params[:id])
                end

                def hyperlink_message_filter_params
                    permitted = params.permit(filter: [:sent])
                    if permitted.permitted?
                        filter = permitted[:filter]
                        filter = {} if filter.nil?
                        if filter[:sent].present?
                            filter[:sent] = filter[:sent] == 'true'
                        end
                        filter
                    end
                end
            end
        end
    end
end