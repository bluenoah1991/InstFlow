class MessageSerializer < ApplicationSerializer
  attributes :id, :bot_id, :msg_id, :msg_type, :text, :source, :agent, :serviceUrl, 
  :user_client_id, :user_client_name, :bot_client_id, :bot_client_name, :channel_id,
  :conversation_id, :platform, :orientation, :time

  as_posixtime :created_at, :updated_at
end
