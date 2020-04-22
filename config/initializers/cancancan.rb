#
# Here is an ugly monkey-patching to make Cancan works well witch Friendly id
#
if defined?(CanCan)
  class Object
    def metaclass
      class << self; self; end
    end
  end

  module CanCan
    module ModelAdapters
      class ActiveRecord5Adapter < ActiveRecord4Adapter
        @@friendly_support = {} # rubocop:todo Style/ClassVars

        def self.find(model_class, id)
          klass =
            model_class.metaclass.ancestors.include?(ActiveRecord::Associations::CollectionProxy) ? # rubocop:todo Style/MultilineTernaryOperator
              model_class.klass : model_class
          @@friendly_support[klass] ||= klass.metaclass.ancestors.include?(FriendlyId)
          @@friendly_support[klass] == true ? model_class.friendly.find(id) : model_class.find(id)
        end
      end
    end
  end
end
