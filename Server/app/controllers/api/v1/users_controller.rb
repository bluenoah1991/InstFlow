module Api
    module V1
        class UsersController < Api::V1::ApplicationController
            before_action :set_instance, except: [:index, :create]

            def index
                @instances = User.all
                render json: @instances
            end

            def create
                requires! :channel_id, type: String
                requires! :user_id, type: String
                optional! :name, type: String
                optional! :extra, type: String
                optional! :tags, type: Array

                @instance = User.new
                @instance.channel_id = params[:channel_id]
                @instance.user_id = params[:user_id]
                @instance.name = params[:name]
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
                optional! :name, type: String
                optional! :extra, type: String
                optional! :tags, type: Array

                @instance.name = !params[:name].nil? ? params[:name] : @instance.name
                @instance.extra = !params[:extra].nil? ? params[:extra] : @instance.extra
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