module Api
    module V1
        class TagsController < ApplicationController
            before_action :set_tag, except: [:index, :create]

            def index
                tags = Tag.all
                render json: tags
            end

            def create
                requires! :tag_id, type: String

                @tag = Tag.new
                @tag.tag_id = params[:tag_id]
                @tag.save!
                
                render json: @tag
            end

            def show
                render json: @tag
            end

            def destroy
                @tag.destroy
                render json: { ok: 1 }
            end

            def set_tag
                @tag = Tag.find(params[:id])
            end
        end
    end
end