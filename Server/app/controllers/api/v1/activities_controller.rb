module Api
    module V1
        class ActivitiesController < Api::V1::ApplicationController
            def index
                body = request.body.read
                send_data HttpPack.parse_body(@current_bot.id, body) { |scope, payload|
                    payload = ActiveSupport::JSON.decode(payload)
                    payload = payload.symbolize_keys
                    activity = Activity.new
                    activity.bot_id = scope
                    activity.type_ = payload[:type]
                    activity.who = payload[:who]
                    activity.body = ActiveSupport::JSON.encode(payload[:body])
                    activity.save!
                    MessageSaveJob.perform_later(activity)
                }
            end
        end
    end
end