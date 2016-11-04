class SendingTaskDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= %w(SendingTask.created_at SendingTask.updated_at)
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= %w(SendingTask.message)
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.message,
        record.target,
        {'total': record.total, 'sent': record.sent, 'fail': record.fail},
        record.state,
        record.created_at,
        record.updated_at,
      ]
    end
  end

  def get_raw_records
    # insert query here
    SendingTask.where(options)
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
