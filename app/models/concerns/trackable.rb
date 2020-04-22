module Trackable
  extend ActiveSupport::Concern

  module ClassMethods
    def track!
      after_validation do
        unless changed_attributes.empty?
          self.modified_at = Time.zone.now
          self.modified_by = Current.user&.id
        end
      end
    end
  end
end
