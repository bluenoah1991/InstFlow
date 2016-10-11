class BotSerializer < ApplicationSerializer
  attributes :id, :name, :access_token, :ms_appid, :ms_appsecret

  def access_token
    object.access_token.gsub(/(?<=\S{3})\S/, '*')
  end

  as_posixtime :created_at, :updated_at
end
