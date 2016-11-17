class NlMessage < ApplicationRecord
    def self.pending
        result = Array.new
        instances = NlMessage.where(orientation: 2, state: 'pending')
        for instance in instances
            instance.with_lock do
                if instance.state == 'pending'
                    instance.state = 'running'
                    instance.save!
                    result << instance
                end
            end
        end
        result
    end
end
