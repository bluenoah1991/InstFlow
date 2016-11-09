class FeedbackSerializer < ApplicationSerializer
  attributes :id, :title, :email, :content

  as_posixtime :created_at, :updated_at
end
