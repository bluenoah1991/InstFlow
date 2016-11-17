class UserSerializer < ApplicationSerializer
  attributes :id, :serviceUrl, :bot_client_id, :bot_client_name, :user_client_id, 
  :user_client_name, :channel_id, :extra, :total_msg, :user_agent, :entry_date, :latest_active

  def total_msg
    object.total_msg
  end

  def user_agent
    # TODO Identifying user agent via extra
    'Skype'
  end

  def entry_date
    object.created_at
  end

  def latest_active
    object.latest_active
  end

  as_posixtime :created_at, :updated_at
  has_many :tags
end
