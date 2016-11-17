class ConversationSerializer < ApplicationSerializer
  attributes :id, :bot_id, :latest_message, :source, :agent, :serviceUrl, 
  :user_client_id, :user_client_name, :bot_client_id, :bot_client_name, :channel_id,
  :conversation_id, :closed, :start_time, :latest_active, :close_time

  as_posixtime :created_at, :updated_at
end
