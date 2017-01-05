class UserUpdateJob < ApplicationJob
  queue_as :digest

  def perform(activity)
    begin
        payload = ActiveSupport::JSON.decode(activity.body)
        instance = User.new
        if activity.type_ == 'message'
            instance.bot_id = activity.bot_id
            instance.serviceUrl = payload['address']['serviceUrl']
            instance.user_client_id = payload['address']['user']['id']
            instance.user_client_name = payload['address']['user']['name']
            instance.bot_client_id = payload['address']['bot']['id']
            instance.bot_client_name = payload['address']['bot']['name']
            instance.channel_id = payload['address']['channelId']
            # instance.latest_message = payload['text']
            # instance.latest_time = DateTime.parse(payload['timestamp'])
            # instance.latest_conversation_id = payload['address']['conversation']['id']
            instance.save!
        elsif activity.type_ == 'agent_message'
            instance.bot_id = activity.bot_id
            instance.serviceUrl = payload['serviceUrl']
            instance.user_client_id = payload['user']['id']
            instance.user_client_name = payload['user']['name']
            instance.bot_client_id = payload['bot']['id']
            instance.bot_client_name = payload['bot']['name']
            instance.channel_id = payload['channelId']
            # instance.latest_message = payload['text']
            # instance.latest_time = DateTime.parse(payload['timestamp'])
            # instance.latest_conversation_id = payload['conversation']['id']
            instance.save!
        end
    rescue Exception => e
    end
  end
end
