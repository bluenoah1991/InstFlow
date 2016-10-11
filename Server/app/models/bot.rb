class Bot < ApplicationRecord
    belongs_to :admin

    has_secure_token :access_token
end
