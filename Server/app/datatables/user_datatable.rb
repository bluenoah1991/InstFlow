class UserDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= %w(User.name User.channel_id User.user_id User.created_at User.updated_at)
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= %w(User.name User.channel_id User.user_id)
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input name="id[]" type="checkbox" class="checkboxes" value="%s"/><span></span></label>' % record.id,
        record.name,
        record.channel_id,
        record.user_id,
        record.created_at,
        record.updated_at
      ]
    end
  end

  def get_raw_records
    # insert query here
    User.all
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
