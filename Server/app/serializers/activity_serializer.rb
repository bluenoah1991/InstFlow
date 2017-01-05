class ActivitySerializer < ApplicationSerializer
  attributes :id, :activity_type, :from, :to, :body

  as_posixtime :created_at, :updated_at
end
