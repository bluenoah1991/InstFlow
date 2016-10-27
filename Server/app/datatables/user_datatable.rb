class UserDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= %w(User.name User.channel_id User.user_client_id User.created_at User.updated_at)
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= %w(User.user_client_name User.channel_id User.user_client_id)
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.user_client_name,
        record.channel_id,
        record.user_client_id,
        record.created_at,
        record.updated_at,
        {'id': record.id, 'state': record.state}
      ]
    end
  end

  def get_raw_records
    # insert query here
    User.where(options)
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
