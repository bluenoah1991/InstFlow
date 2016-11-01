class SendingTaskSerializer < ApplicationSerializer
  attributes :id, :bot_id, :hyperlink_message_id, :target, :total, :sent, :state

  as_posixtime :created_at, :updated_at
end
