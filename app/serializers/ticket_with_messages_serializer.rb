# typed: strict
class TicketWithMessagesSerializer < TicketSerializer

  has_many :messages, serializer: MessageSerializer

end
