class UserSerializer < ApplicationSerializer
  attributes :id, :channel_id, :user_id, :name, :extra, :total_msg, :user_agent, :entry_date, :latest_active

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
