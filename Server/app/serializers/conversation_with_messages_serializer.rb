class ConversationWithMessagesSerializer < ApplicationSerializer
  attributes :id, :bot_id, :latest_message, :source, :agent, :serviceUrl, 
  :user_client_id, :user_client_name, :bot_client_id, :bot_client_name, :channel_id,
  :conversation_id, :closed, :start_time, :latest_active, :close_time, :messages

  def messages
    msgs = NlMessage.where('channel_id = ? and conversation_id = ? and time <= ? and time >= ?', 
      object.channel_id, object.conversation_id, object.latest_active, object.start_time)
  end

  as_posixtime :created_at, :updated_at
end
