class MessageDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= %w(Message.time)
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= %w(Message.text)
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.text,
        record.orientation,
        record.platform,
        record.time
      ]
    end
  end

  def get_raw_records
    # insert query here
    Message.where(options)
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
