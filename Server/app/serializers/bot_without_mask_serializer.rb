class BotWithoutMaskSerializer < ApplicationSerializer
  attributes :id, :name, :access_token, :ms_appid, :ms_appsecret, :newborn

  def newborn
    true
  end

  as_posixtime :created_at, :updated_at
end
