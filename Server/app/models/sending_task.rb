class SendingTask < ApplicationRecord
    def begin_ready(total)
        self.with_lock do
            self.total = total
            self.state = 1
            self.save!
        end
    end

    def begin_running()
        self.with_lock do
            self.state = 2
            self.save!
        end
    end

    def successed()
        self.with_lock do
            self.state = 3
            self.save!
        end
    end

    def failed()
        self.with_lock do
            self.state = -1
            self.save!
        end
    end

    def send_successed(user)
        self.with_lock do
            self.sent += 1
            if self.sent + self.fail >= self.total
                self.state = 3
            end
            self.save!
        end
    end

    def send_failed(user)
        self.with_lock do
            self.fail += 1
            if self.sent + self.fail >= self.total
                self.state = 3
            end
            self.save!
        end
    end
end
