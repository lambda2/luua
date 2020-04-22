class ReplyMailer < ApplicationMailer
  extend T::Sig

  sig { params(from: String, to: T.any(T::Array[String], String), cc: T::Array[String], subject: String, message: String).returns(Mail::Message) }
  # rubocop:todo Naming/MethodParameterName
  def reply(from, to, cc, subject, message)
    mail(
      subject: subject,
      to: to,
      cc: cc,
      from: from,
      body: message,
      tag: 'Reply',
      track_opens: 'true'
    )
  end
  # rubocop:enable Naming/MethodParameterName

end
