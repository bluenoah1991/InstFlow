
Rails.application.config.middleware.use BatchApi::RackMiddleware do |batch_config|
    batch_config.endpoint = "/api/v1/batch"
    batch_config.limit = 100

    # batch_config.batch_middleware = Proc.new {}
    # batch_config.operation_middleware = Proc.new {}
end