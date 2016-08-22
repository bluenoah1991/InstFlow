class UserSerializer < ApplicationSerializer
  attributes :id, :channel_id, :user_id, :name, :extra

  as_posixtime :created_at, :updated_at
  has_many :tags
end
