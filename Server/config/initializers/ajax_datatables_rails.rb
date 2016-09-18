AjaxDatatablesRails.configure do |config|
  # available options for db_adapter are: :oracle, :pg, :mysql2, :sqlite3
  config.db_adapter = :sqlite3

  # available options for paginator are: :simple_paginator, :kaminari, :will_paginate
  config.paginator = :simple_paginator
end
