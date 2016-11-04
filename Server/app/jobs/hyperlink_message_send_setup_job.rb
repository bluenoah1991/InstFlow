class HyperlinkMessageSendSetupJob < ApplicationJob
  queue_as :sending

  def perform(bot_id, target, message, task_id)
    task = SendingTask.find(task_id)
    begin
      if target == 'enabled'
        @users = User.enabled(bot_id)
      elsif target == 'all'
        @users = User.bot(bot_id)
      end
      if @users.present?
        task.begin_ready(@users.count)
        task.begin_running()
        for user in @users
          HyperlinkMessageSendJob.perform_later(bot_id, user.id, message, task_id)
        end
      end
    rescue
      task.failed()
    end
  end
end
