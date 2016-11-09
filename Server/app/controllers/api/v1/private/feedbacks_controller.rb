module Api
    module V1
        module Private
            class FeedbacksController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:create]

                def create
                    requires! :title, type: String
                    requires! :email, type: String
                    requires! :content, type: String

                    @instance = Feedback.new
                    @instance.title = params[:title]
                    @instance.email = params[:author]
                    @instance.content = params[:content]
                    @instance.save!

                    render json: @instance
                end

                def show
                    render json: @instance
                end

                def update
                    optional! :title, type: String
                    optional! :email, type: String
                    optional! :content, type: String

                    @instance.title = !params[:title].nil? ? params[:title] : @instance.title
                    @instance.email = !params[:email].nil? ? params[:email] : @instance.email
                    @instance.content = !params[:content].nil? ? params[:content] : @instance.content
                    @instance.save!

                    render json: @instance
                end

                def destroy
                    @instance.destroy
                    render json: { ok: 1 }
                end

                private

                def set_instance
                    @instance = Feedback.find(params[:id])
                end
            end
        end
    end
end