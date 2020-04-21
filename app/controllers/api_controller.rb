# typed: strong

class ApiController < ApplicationController

  before_action :log_intel

  def log_intel
    puts "🚠 Request by [#{current_user&.email || 'anonymous'}]"
  end

  # We'll try to standardize the way we send errors here
  def render_error(messages, code = 500)
    render json: { error: true, errors: messages }, status: code
  end
end
