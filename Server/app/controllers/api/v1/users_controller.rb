module Api
    module V1
        class UsersController < ApplicationController
            before_action :set_user, except: [:index, :create]

            def index
                users = User.all
                render json: users
            end

            def create
                requires! :channel_id, type: String
                requires! :user_id, type: String
                optional! :name, type: String
                optional! :extra, type: String
                optional! :tags, type: Array

                @user = User.new
                @user.channel_id = params[:channel_id]
                @user.user_id = params[:user_id]
                @user.name = params[:name]
                @user.extra = params[:extra]
                if params.has_key?(:tags)
                    @user.tags = params[:tags].map! { |tag_id| 
                        Tag.find_or_create_by(:tag_id => tag_id)
                    }
                end
                @user.save!

                render json: @user
            end

            def show
                render json: @user
            end

            def update
                optional! :name, type: String
                optional! :extra, type: String
                optional! :tags, type: Array

                @user.name = params[:name].present? ? params[:name] : @user.name
                @user.extra = params[:extra].present? ? params[:extra] : @user.extra
                if params.has_key?(:tags)
                    @user.tags = params[:tags].map! { |tag_id| 
                        Tag.find_or_create_by(:tag_id => tag_id)
                    }
                end
                @user.save!

                render json: @user
            end

            def destroy
                @user.destroy
                render json: { ok: 1 }
            end

            def set_user
                @user = User.find(params[:id])
            end
        end
    end
end