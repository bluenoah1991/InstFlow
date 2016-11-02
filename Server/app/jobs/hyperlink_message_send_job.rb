class HyperlinkMessageSendJob < ApplicationJob
  queue_as :sending

  def perform(bot_id, user_id, message, task_id)
    debugger
    task = SendingTask.find(task_id)
    begin
      bot = Bot.find(bot_id)
      user = User.find(user_id)
      message = BotFramework::Client.send(bot, user, message)
      task.send_successed(user)
    rescue Exception => e
      task.send_failed(user)
    end
  end
end
