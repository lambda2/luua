require 'rspec/expectations'

module JsonRequestHelper
  RSpec::Matchers.define :match_item_in_json do |item|
    match do |actual|
      e = actual.is_a?(String) ? JSON.parse(actual) : actual
      e['id'] == item.id
    end
  end

  RSpec::Matchers.define :match_attributes_in_json do |attributes|
    match do |actual|
      e = actual.is_a?(String) ? JSON.parse(actual) : actual
      attributes.all? do |k, v|
        puts "Testing that #{k.to_s} [#{e[k.to_s]} == #{v}]"
        e[k.to_s] == v
      end
    end
    diffable
  end

  RSpec::Matchers.define :contain_item_in_json do |item|
    match do |actual|
      e = actual.is_a?(String) ? JSON.parse(actual) : actual
      e.map {|i| i['id'] }.include?(item.id)
    end
  end

  RSpec::Matchers.define :contain_item_in_json_at do |item, pos|
    match do |actual|
      e = actual.is_a?(String) ? JSON.parse(actual) : actual
      e[pos]['id'] == item.id
    end
  end

  RSpec::Matchers.define :have_item_count_in_json do |item_count|
    match do |actual|
      e = actual.is_a?(String) ? JSON.parse(actual) : actual
      puts "Testing that #{e.count} == #{item_count}"

      e.count == item_count
    end
  end
end
