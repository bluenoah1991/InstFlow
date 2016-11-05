class HyperlinkMessageDatatable < AjaxDatatablesRails::Base

  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= %w(HyperlinkMessage.title HyperlinkMessage.author HyperlinkMessage.created_at HyperlinkMessage.updated_at)
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= %w(HyperlinkMessage.title HyperlinkMessage.author)
  end

  private

  def data
    records.map do |record|
      [
        # comma separated list of the values for each cell of a table row
        # example: record.attribute,
        record.id,
        record.title,
        record.author,
        record.created_at,
        record.updated_at,
        {'id': record.id}
      ]
    end
  end

  def get_raw_records
    # insert query here
    HyperlinkMessage.where(:snapshot => false).where(options)
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
