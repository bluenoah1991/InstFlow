class SendingTask < ApplicationRecord
    def begin_ready(total)
        self.total = total
        self.state = 1
        self.save!
    end

    def begin_running()
        self.state = 2
        self.save!
    end

    def failed()
        self.state = -1
        self.save!
    end

    def send_successed(user)
        self.sent = self.sent + 1
        if self.sent + self.fail >= self.total
            self.state = 3
        end
        self.save!
    end

    def send_failed(user)
        self.fail = self.fail + 1
        if self.sent + self.fail >= self.total
            self.state = 3
        end
        self.save!
    end
end
