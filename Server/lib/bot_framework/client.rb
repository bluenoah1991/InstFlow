require 'securerandom'

module BotFramework
    class Client
        def self.send(bot, user, content)
            config = ::SwaggerClient::Configuration.new
            config.host = user.serviceUrl
            config.access_token = BotFramework::Auth.connect(bot.ms_appid, bot.ms_appsecret)['access_token']
            api_client = ::SwaggerClient::ApiClient.new(config)
            api_instance = ::SwaggerClient::ConversationsApi.new(api_client)
            params = ::SwaggerClient::ConversationParameters.new({
                :bot => { id: user.bot_client_id, name: user.bot_client_name },
                :members => [
                    { id: user.user_client_id, name: user.user_client_name }
                ]
            })
            result = api_instance.conversations_create_conversation(params)
            conversation_id = result.id
            if conversation_id.present?
                activity = ::SwaggerClient::Activity.new({
                    :type => 'message',
                    :text => content,
                    :from => {
                        id: user.bot_client_id, name: user.bot_client_name
                    },
                    recipient => {
                        id: user.user_client_id, name: user.user_client_name
                    }
                })
                api_instance.conversations_send_to_conversation(activity, conversation_id)
                message = Message.new
                message.bot_id = bot.id
                message.msg_id = SecureRandom.uuid
                message.msg_type = 'message'
                message.text = content
                message.agent = 'instflow'
                message.serviceUrl = user.serviceUrl
                message.user_client_id = user.user_client_id
                message.user_client_name = user.user_client_name
                message.bot_client_id = user.bot_client_id
                message.bot_client_name = user.bot_client_name
                message.channel_id = user.channel_id
                message.conversation_id = conversation_id
                message.orientation = 2
                message.time = Time.new
                message.platform = true
                message.save!
                return message
            end
        end
    end
end