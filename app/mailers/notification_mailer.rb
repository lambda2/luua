class NotificationMailer < ApplicationMailer

  helper UrlHelper
  helper NotificationHelper

  # This mail will send a summary of all unread notifications
  def notification_summary
    @user = params[:user]
    @notifications = params[:notifications]

    I18n.with_locale(@user.locale) do

      headers 'X-SMTPAPI' => {
        category: %w[Luua Notifications],
        asm_group_id: 17_943,
        unique_args: {
          locale: I18n.locale,
          environment: Rails.env
        }
      }.to_json

      mail(
        to: @user.email,
        subject: default_i18n_subject(user: @user.username)
      )
    end
  end

end
