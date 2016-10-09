module Api
    module V1
        class TagsController < Api::V1::ApplicationController
            before_action :set_instance, except: [:index, :create]

            def index
                @instances = Tag.all
                render json: @instances
            end

            def create
                requires! :tag_id, type: String

                @instance = Tag.new
                @instance.tag_id = params[:tag_id]
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
                @instance = Tag.find(params[:id])
            end
        end
    end
end