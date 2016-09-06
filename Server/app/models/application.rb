require 'securerandom'

class Application < ApplicationRecord
    belongs_to :admin

    has_secure_token :appkey

    before_create :populate_appid

    private

    def populate_appid
        self.appid = generate_random_str
    end

    def generate_random_str
        SecureRandom.uuid
    end
end
