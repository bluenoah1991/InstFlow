module Api
    module V1
        module Private
            class BotsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:index, :create, :connect]

                def index
                    @instances = Bot.all
                    render json: @instances
                end

                def create
                    requires! :name, type: String
                    optional! :ms_appid, type: String
                    optional! :ms_appsecret, type: String

                    @instance = Bot.new
                    @instance.name = params[:name]
                    @instance.ms_appid = params[:ms_appid]
                    @instance.ms_appsecret = params[:ms_appsecret]
                    @instance.connected = BotFramework::Auth.check(params[:ms_appid], params[:ms_appsecret])
                    @instance.admin = current_user
                    @instance.save!

                    render json: @instance, serializer: BotWithoutMaskSerializer
                end

                def connect
                    optional! :id, type: Integer
                    requires! :ms_appid, type: String
                    requires! :ms_appsecret, type: String

                    if BotFramework::Auth.check(params[:ms_appid], params[:ms_appsecret])
                        render json: { state: 1 }
                    else
                        render json: { state: -1 }
                    end
                end

                def show
                    render json: @instance
                end

                def update
                    optional! :name, type: String
                    optional! :ms_appid, type: String
                    optional! :ms_appsecret, type: String

                    @instance.name = !params[:name].nil? ? params[:name] : @instance.name
                    @instance.ms_appid = !params[:ms_appid].nil? ? params[:ms_appid] : @instance.ms_appid
                    @instance.ms_appsecret = !params[:ms_appsecret].nil? ? params[:ms_appsecret] : @instance.ms_appsecret
                    @instance.connected = BotFramework::Auth.check(params[:ms_appid], params[:ms_appsecret])
                    @instance.save!

                    render json: @instance
                end

                def destroy
                    name = @instance.name
                    @instance.destroy
                    render json: { ok: 1, name: name }
                end

                def set_instance
                    @instance = Bot.find(params[:id])
                end
            end
        end
    end
end