# https://github.com/influitive/apartment/pull/266
require 'apartment'
require 'apartment/adapters/mysql2_adapter'
require 'apartment/adapters/postgresql_adapter'
require 'apartment/adapters/sqlite3_adapter'

module Apartment

    class << self
        def_delegators :connection_class, :connection_handler, :connection_handler=, :connected?
    end

    module Adapters
        class Mysql2Adapter < AbstractAdapter

            def initialize(config)
                super

                @default_tenant = config[:database]
                Apartment.connection_handler = ActiveRecord::ConnectionAdapters::ConnectionHandler.new
                reset
                process_excluded_models
            end

        end

        class PostgresqlAdapter < AbstractAdapter

            def initialize(config)
                super

                Apartment.connection_handler = ActiveRecord::ConnectionAdapters::ConnectionHandler.new
                reset
                process_excluded_models
            end

        end

        class PostgresqlSchemaAdapter < AbstractAdapter

            def initialize(config)
                super

                unless Apartment.connected?
                    Apartment.establish_connection(config)
                end
                reset
                process_excluded_models
            end

        end

        class Sqlite3Adapter < AbstractAdapter

            def initialize(config)
                @default_dir = File.expand_path(File.dirname(config[:database]))

                super

                Apartment.connection_handler = ActiveRecord::ConnectionAdapters::ConnectionHandler.new
                reset
                process_excluded_models
            end

        end
    end

end
