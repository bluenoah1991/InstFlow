#!/usr/bin/ruby

require 'swagger_client'

api_instance = SwaggerClient::ConversationsApi.new

begin
    require 'pry'
    binding.pry
    result = api_instance.conversations_new_conversation
    
    conversation_id = result.conversation_id
    message = SwaggerClient::Message.new({
        "text" => 'Hi'
    })
    result = api_instance.conversations_post_message(conversation_id, message)
    
    t = Thread.new do
        i = 0
        while i < 10
            sleep 1
            result = api_instance.conversations_get_messages(conversation_id)
            p result
            i = i + 1
        end
    end
    t.join

rescue SwaggerClient::ApiError => e
    puts "Exception when calling ConversationsApi: #{e}"
end
