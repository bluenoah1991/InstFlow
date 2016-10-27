module Api
    module V1
        class UsersController < Api::V1::ApplicationController
            before_action :set_instance, except: [:index, :create]

            def index
                @instances = User.all
                render json: @instances
            end

            def create
                requires! :serviceUrl, type: String
                optional! :bot_client_id, type: String
                optional! :bot_client_name, type: String
                requires! :user_client_id, type: String
                optional! :user_client_name, type: String
                requires! :channel_id, type: String
                optional! :extra, type: String
                optional! :tags, type: Array

                @instance = User.new
                @instance.bot_id = @current_bot.id
                @instance.serviceUrl = params[:serviceUrl]
                @instance.bot_client_id = params[:bot_client_id]
                @instance.bot_client_name = params[:bot_client_name]
                @instance.user_client_id = params[:user_client_id]
                @instance.user_client_name = params[:user_client_name]
                @instance.channel_id = params[:channel_id]
                @instance.extra = params[:extra]
                if params.has_key?(:tags)
                    @instance.tags = params[:tags].map! { |tag_id| 
                        Tag.find_or_create_by(:tag_id => tag_id)
                    }
                end
                @instance.save!

                render json: @instance
            end

            def show
                render json: @instance
            end

            def update
                optional! :user_client_name, type: String
                optional! :tags, type: Array

                @instance.user_client_name = !params[:user_client_name].nil? ? params[:user_client_name] : @instance.user_client_name
                if params.has_key?(:tags)
                    @instance.tags = params[:tags].map! { |tag_id| 
                        Tag.find_or_create_by(:tag_id => tag_id)
                    }
                end
                @instance.save!

                render json: @instance
            end

            def destroy
                @instance.destroy
                render json: { ok: 1 }
            end

            def set_instance
                @instance = User.find(params[:id])
            end
        end
    end
end