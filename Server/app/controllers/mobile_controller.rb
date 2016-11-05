class MobileController < ApplicationController
    before_action :set_instance
    
    def index
    end

    private

    def set_instance
        @instance = HyperlinkMessage.find(params[:id])
    end
end
