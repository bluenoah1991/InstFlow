class Message < ApplicationRecord
    scope :who, ->(channel_id, user_client_id) { 
        where('channel_id = ? and user_client_id = ?', channel_id, user_client_id) 
    }
end
