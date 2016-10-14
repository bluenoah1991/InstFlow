module Api
    module V1
        module Private
            class BotsController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance, except: [:index, :create, :connect]

                @@TOKEN_ENDPOINT = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'

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
                    @instance.connected = connect_(params[:ms_appid], params[:ms_appsecret])
                    @instance.admin = current_user
                    @instance.save!

                    render json: @instance, serializer: BotWithoutMaskSerializer
                end

                def connect_(ms_appid, ms_appsecret)
                    response = HTTP.timeout(:global, :write => 2, :connect => 5, :read => 10)
                        .post(@@TOKEN_ENDPOINT, :form => {
                            :grant_type => 'client_credentials',
                            :client_id => ms_appid,
                            :client_secret => ms_appsecret,
                            :scope => 'https://graph.microsoft.com/.default'
                        })
                    response.code == 200
                end

                def connect
                    optional! :id, type: Integer
                    requires! :ms_appid, type: String
                    requires! :ms_appsecret, type: String

                    if connect_(params[:ms_appid], params[:ms_appsecret])
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
                    @instance.connected = connect_(params[:ms_appid], params[:ms_appsecret])
                    @instance.save!

                    render json: @instance
                end

                def destroy
                    @instance.destroy
                    render json: { ok: 1 }
                end

                def set_instance
                    @instance = Bot.find(params[:id])
                end
            end
        end
    end
end