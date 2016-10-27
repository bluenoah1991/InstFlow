module BotFramework
    class Auth
        @@TOKEN_ENDPOINT = 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
        
        def self.check(ms_appid, ms_appsecret)
            response = HTTP.timeout(:global, :write => 2, :connect => 5, :read => 10)
                .post(@@TOKEN_ENDPOINT, :form => {
                    :grant_type => 'client_credentials',
                    :client_id => ms_appid,
                    :client_secret => ms_appsecret,
                    :scope => 'https://graph.microsoft.com/.default'
                })
            response.code == 200
        end

        def self.connect(ms_appid, ms_appsecret)
            response = HTTP.timeout(:global, :write => 2, :connect => 5, :read => 10)
                .post(@@TOKEN_ENDPOINT, :form => {
                    :grant_type => 'client_credentials',
                    :client_id => ms_appid,
                    :client_secret => ms_appsecret,
                    :scope => 'https://graph.microsoft.com/.default'
                })
            response.parse
        end
    end
end