class Message < ApplicationRecord
    scope :who, ->(channel_id, user_id) { 
        where('channel_id = ? and user_id = ?', channel_id, user_id) 
    }
end
