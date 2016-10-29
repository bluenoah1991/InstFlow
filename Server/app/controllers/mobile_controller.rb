class MobileController < ApplicationController
    def index
        @instance = HyperlinkMessage.last
    end
end
