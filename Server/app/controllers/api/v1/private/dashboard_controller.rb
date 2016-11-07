module Api
    module V1
        module Private
            class DashboardController < Api::V1::Private::ApplicationController
                before_action :authenticate_admin!
                before_action :authenticate_tenant!

                def index
                    render json: {
                        totalUserNum: 1874,
                        weeklyActiveUserNum: 931,
                        totalMessagesNum: 8492,
                        totalReceivedNum: 2849,
                        activeUser: {
                            weekly: [
                                ['02/2013', 1500],
                                ['03/2013', 2500],
                                ['04/2013', 1700],
                                ['05/2013', 800],
                                ['06/2013', 1500],
                                ['07/2013', 2350],
                                ['08/2013', 1500],
                                ['09/2013', 1300],
                                ['10/2013', 4600]
                            ],
                            monthly: [
                                ['02/2013', 2500],
                                ['03/2013', 1500],
                                ['04/2013', 4700],
                                ['05/2013', 1800],
                                ['06/2013', 500],
                                ['07/2013', 350],
                                ['08/2013', 3500],
                                ['09/2013', 2300],
                                ['10/2013', 7600]
                            ],
                            quarterly: [
                                ['02/2013', 1500],
                                ['03/2013', 2500],
                                ['04/2013', 1700],
                                ['05/2013', 800],
                                ['06/2013', 1500],
                                ['07/2013', 2350],
                                ['08/2013', 1500],
                                ['09/2013', 1300],
                                ['10/2013', 4600]
                            ]
                        }
                    }
                end
            end
        end
    end
end