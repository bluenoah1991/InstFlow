class ApplicationSerializer < ActiveModel::Serializer

    class << self
        def as_posixtime(*attrs)
            attrs = attrs.first if attrs.first.class == Array

            attrs.each do |attr| 
                attribute(attr) { 
                    val = object.attributes[attr.to_s]
                    val.to_time.to_i if val && val.class == ActiveSupport::TimeWithZone
                }
            end
        end
    end

end