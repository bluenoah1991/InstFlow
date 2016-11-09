module Api
    module V1
        module Private
            class DashboardController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!
                before_action :set_instance

                def index
                    render json: {
                        totalUserNum: total_user_num,
                        weeklyActiveUserNum: weekly_active_user_num,
                        totalMessagesNum: total_messages_num,
                        totalReceivedNum: total_received_num,
                        activeUser: active_user,
                        newUser: new_user,
                        receivedNum: prev_15_received_num,
                        sentNum: prev_15_sent_num,
                        sparklineReceived: prev_15_received,
                        sparklineSent: prev_15_sent,
                        recentMessages: recent_messages,
                        hyperlinkMessages: hyperlink_messages
                    }
                end

                private
                def set_instance
                    @bot = Bot.find(params[:bot_id])
                end

                def total_user_num
                    User.where(bot_id: @bot.id).where(state: 0).count
                end

                def weekly_active_user_num
                    Message.where(bot_id: @bot.id).where('time > ?', DateTime.now.beginning_of_week)
                        .select(:user_client_id).distinct.count
                end

                def total_messages_num
                    Message.where(bot_id: @bot.id).count
                end

                def total_received_num
                    Message.where(bot_id: @bot.id).where(orientation: 1).count
                end

                def weekly_active_user
                    items = []
                    from = DateTime.now.beginning_of_week
                    to = DateTime.now.end_of_week
                    while from <= to do
                        n = Message.where(bot_id: @bot.id).where('time > ? and time < ?', from, from.end_of_day)
                            .select(:user_client_id).distinct.count
                        items = items.push([Date::DAYNAMES[from.wday], n])
                        from = from.next
                    end
                    items
                end

                def monthly_active_user
                    items = []
                    from = DateTime.now.beginning_of_month
                    to = DateTime.now.end_of_month
                    while from <= to do
                        n = Message.where(bot_id: @bot.id).where('time > ? and time < ?', from, from.end_of_day)
                            .select(:user_client_id).distinct.count
                        items = items.push([from.mday, n])
                        from = from.next
                    end
                    items
                end

                def quarterly_active_user
                    items = []
                    from = DateTime.now.beginning_of_quarter
                    to = DateTime.now.end_of_quarter
                    while from <= to do
                        n = Message.where(bot_id: @bot.id).where('time > ? and time < ?', from, from.end_of_month)
                            .select(:user_client_id).distinct.count
                        items = items.push([from.mon, n])
                        from = from.next_month
                    end
                    items
                end

                def active_user
                    {
                        weekly: weekly_active_user,
                        monthly: monthly_active_user,
                        quarterly: quarterly_active_user
                    }
                end

                def weekly_new_user
                    items = []
                    from = DateTime.now.beginning_of_week
                    to = DateTime.now.end_of_week
                    while from <= to do
                        n = User.where(bot_id: @bot.id).where('created_at > ? and created_at < ?', from, from.end_of_day).count
                        items = items.push([Date::DAYNAMES[from.wday], n])
                        from = from.next
                    end
                    items
                end

                def monthly_new_user
                    items = []
                    from = DateTime.now.beginning_of_month
                    to = DateTime.now.end_of_month
                    while from <= to do
                        n = User.where(bot_id: @bot.id).where('created_at > ? and created_at < ?', from, from.end_of_day).count
                        items = items.push([from.mday, n])
                        from = from.next
                    end
                    items
                end

                def quarterly_new_user
                    items = []
                    from = DateTime.now.beginning_of_quarter
                    to = DateTime.now.end_of_quarter
                    while from <= to do
                        n = User.where(bot_id: @bot.id).where('created_at > ? and created_at < ?', from, from.end_of_month).count
                        items = items.push([from.mon, n])
                        from = from.next_month
                    end
                    items
                end

                def new_user
                    {
                        weekly: weekly_new_user,
                        monthly: monthly_new_user,
                        quarterly: quarterly_new_user
                    }
                end

                def prev_15_received
                    items = []
                    from = DateTime.now.prev_day(15)
                    to = DateTime.now
                    while from <= to do
                        n = Message.where(bot_id: @bot.id).where('orientation = ? and time > ? and time < ?', 1, from, from.next).count
                        items.push(n)
                        from = from.next
                    end
                    items
                end

                def prev_15_sent
                    items = []
                    from = DateTime.now.prev_day(15)
                    to = DateTime.now
                    while from <= to do
                        n = Message.where(bot_id: @bot.id).where('orientation = ? and time > ? and time < ?', 2, from, from.next).count
                        items.push(n)
                        from = from.next
                    end
                    items
                end

                def prev_15_received_num
                    from = DateTime.now.prev_day(15)
                    to = DateTime.now
                    Message.where(bot_id: @bot.id).where('orientation = ? and time > ? and time < ?', 1, from, to).count
                end

                def prev_15_sent_num
                    from = DateTime.now.prev_day(15)
                    to = DateTime.now
                    Message.where(bot_id: @bot.id).where('orientation = ? and time > ? and time < ?', 2, from, to).count
                end

                def recent_messages
                    from = DateTime.now.prev_day(15)
                    to = DateTime.now
                    msgs = Message.where(bot_id: @bot.id).where('orientation = ? and time > ? and time < ?', 1, from, to).order(time: :desc).limit(5)
                    msgs.map do |msg|
                        {
                            user: msg.user_client_name,
                            agent: msg.agent,
                            message: msg.text[0,50],
                            time: msg.time 
                        }
                    end
                end

                def hyperlink_messages
                    tasks = SendingTask.where(bot_id: @bot.id).order(created_at: :desc).limit(10)
                    tasks.map do |task|
                        msg = HyperlinkMessage.find(task.hyperlink_message_id)
                        if msg.present?
                            {
                                title: msg.title[0, 50],
                                summary: msg.content[0,100],
                                time: task.created_at
                            }
                        else 
                            {} 
                        end
                    end
                end
            end
        end
    end
end