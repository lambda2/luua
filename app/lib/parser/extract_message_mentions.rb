#
# Returns all the mentions contained in a message
#
class Parser::ExtractMessageMentions

  class << self

    # from a string, draft-js message content
    def from_string_serialized_content(scontent)
      return [] if scontent.blank?

      json_structure = JSON.parse(scontent)
      Rails.logger.debug("Parsing message #{json_structure}")

      filtered = json_structure['entityMap'].filter do |_pos, data|
        data['type'] == Message::MENTION_TYPE
      end

      mentions = filtered.map do |_pos, data|
        Rails.logger.debug("mention: #{data}")
        data.dig('data', 'mention', 'slug') || data.dig('data', 'mention', 'username')
      end
      Rails.logger.debug("final mentions: #{mentions.inspect}")

      mentions.compact.flatten
    end

  end
end
