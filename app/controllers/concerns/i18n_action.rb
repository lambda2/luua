module I18nAction
  extend ActiveSupport::Concern

  included do
    around_action :change_locale
  end

  private

  def change_locale(&action)
    locale = extract_locale || I18n.default_locale
    response.set_header('Locale', locale)
    # puts "Setting locale to #{locale} (was #{I18n.locale})"
    I18n.with_locale(locale, &action)
    # puts "Setting locale back to #{I18n.locale}"
  end

  def extract_locale
    subd = request.subdomains.first
    parsed_locale = params[:locale] ||
                    current_user&.locale ||
                    (request.env['HTTP_ACCEPT_LANGUAGE'] && request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/)[0]) ||
                    subd
    Rails.logger.debug "🇪🇺 Parsed locale is #{parsed_locale}" if parsed_locale
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end

end
