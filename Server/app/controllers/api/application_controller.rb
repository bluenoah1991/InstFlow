module Api
  class ApplicationController < ActionController::API
    class ParameterValueNotAllowed < ActionController::ParameterMissing
      attr_reader :values
      def initialize(param, values) # :nodoc:
        @param = param
        @values = values
        super("param: #{param} value only allowed in: #{values}")
      end
    end

    class ParameterTypeNotAllowed < ActionController::ParameterMissing
      attr_reader :type
      def initialize(param, type)
        @param = param
        @type = type
        super("param: #{param} type only allowed as: #{type}")
      end
    end

    class AccessDenied < StandardError; end
    class PageNotFound < StandardError; end

    rescue_from(ActionController::ParameterMissing) do |err|
      render json: { error: 'ParameterInvalid', message: err }, status: 400
    end
    rescue_from(ActiveRecord::RecordInvalid) do |err|
      render json: { error: 'RecordInvalid', message: err }, status: 400
    end
    rescue_from(AccessDenied) do |err|
      render json: { error: 'AccessDenied', message: err }, status: 403
    end
    rescue_from(ActiveRecord::RecordNotFound) do
      render json: { error: 'ResourceNotFound' }, status: 404
    end

    def requires!(name, opts = {})
      opts[:require] = true
      optional!(name, opts)
    end

    def optional!(name, opts = {})
      if params[name].blank? && opts[:require] == true
        raise ActionController::ParameterMissing.new(name)
      end

      if opts[:values] && params[name].present?
        values = opts[:values].to_a
        if !values.include?(params[name]) && !values.include?(params[name].to_i)
          raise ParameterValueNotAllowed.new(name, opts[:values])
        end
      end

      if opts[:type] && params[name].present?
        unless params[name].kind_of? opts[:type]
          raise ParameterTypeNotAllowed.new(name, opts[:type])
        end
      end 

      if params[name].blank? && opts[:default].present?
        params[name] = opts[:default]
      end
    end

    def error!(data, status_code = 400)
      render json: data, status: status_code
    end

    def error_404!
      error!({ 'error' => 'Page not found' }, 404)
    end

    def current_user
    end
  end
end
