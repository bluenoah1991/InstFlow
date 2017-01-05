class MessageSaveJob < ApplicationJob
  queue_as :digest

  def perform(activity)
    begin
        payload = ActiveSupport::JSON.decode(activity.body)
        instance = Message.new
        if activity.type_ == 'message'
          instance.bot_id = activity.bot_id
          # instance.msg_id = UUID.new.generate
          instance.msg_id = payload['msg_id']
          instance.msg_type = payload['type']
          instance.text = payload['text']
          instance.source = payload['source']
          instance.agent = payload['agent']
          instance.serviceUrl = payload['address']['serviceUrl']
          instance.user_client_id = payload['address']['user']['id']
          instance.user_client_name = payload['address']['user']['name']
          instance.bot_client_id = payload['address']['bot']['id']
          instance.bot_client_name = payload['address']['bot']['name']
          instance.channel_id = payload['address']['channelId']
          instance.conversation_id = payload['address']['conversation']['id']
          instance.orientation = payload['orientation']
          instance.time = DateTime.parse(payload['timestamp'])
          instance.save!
        elsif activity.type_ == 'agent_message'
          instance.bot_id = activity.bot_id
          instance.msg_id = payload['msg_id']
          instance.msg_type = payload['type']
          instance.text = payload['text']
          instance.source = payload['source']
          instance.agent = payload['botbuilder']
          instance.serviceUrl = payload['serviceUrl']
          instance.user_client_id = payload['user']['id']
          instance.user_client_name = payload['user']['name']
          instance.bot_client_id = payload['bot']['id']
          instance.bot_client_name = payload['bot']['name']
          instance.channel_id = payload['channelId']
          instance.conversation_id = payload['conversation']['id']
          instance.orientation = payload['orientation']
          instance.time = DateTime.parse(payload['timestamp'])
          instance.save!
        end
        if payload['orientation'] == 1
          UserUpdateJob.perform_later(activity)
        end
    rescue Exception => e
    end
  end
end
