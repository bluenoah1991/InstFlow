module Api
    module V1
        module Private
            class ApplicationsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:create]

                def create
                    requires! :name, type: String
                    optional! :ms_appid, type: String
                    optional! :ms_appkey, type: String

                    @instance = Application.new
                    @instance.name = params[:name]
                    @instance.ms_appid = params[:ms_appid]
                    @instance.ms_appsecret = params[:ms_appsecret]
                    @instance.admin = current_user
                    @instance.save!

                    render json: @instance.to_json
                end

                def show
                    render json: @instance.to_json
                end

                def update
                    optional! :name, type: String
                    optional! :ms_appid, type: String
                    optional! :ms_appkey, type: String

                    @instance.name = !params[:name].nil? ? params[:name] : @instance.name
                    @instance.ms_appid = !params[:ms_appid].nil? ? params[:ms_appid] : @instance.ms_appid
                    @instance.ms_appkey = !params[:ms_appkey].nil? ? params[:ms_appkey] : @instance.ms_appkey
                    @instance.save!

                    render json: @instance.to_json
                end

                def set_instance
                    @instance = Application.find(params[:id])
                end
            end
        end
    end
end