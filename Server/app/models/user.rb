class User < ApplicationRecord
    has_and_belongs_to_many :tags

    validates :user_id, uniqueness: { scope: :channel_id }

    def total_msg
        Message.where('channel_id = ? and user_id = ?', channel_id, user_id).count
    end

    def latest_active
        latest_msg = Message.where('channel_id = ? and user_id = ? and orientation = ?', channel_id, user_id, 1).order(:time).first
        latest_msg.time if latest_msg.present?
    end
end
