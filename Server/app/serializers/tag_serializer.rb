class TagSerializer < ApplicationSerializer
  attributes :id, :tag_id

  as_posixtime :created_at, :updated_at
end
