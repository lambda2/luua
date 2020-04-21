# typed: true
# require 'pp'

class Inbound::HooksController < ActionController::API

  def new_message
    message = params.require(:message)
    message = params.require(:message)
  end

  # A slack workspace configuration has been updated
  # We need to maintain it on our side here...
  # @TODO tres risque prone, a refaire
  def update_origin_from_slack_workspace
    slack_team_id = params.require(:id)
    origin = ::SlackOrigin.setup_from_slack_team(slack_team_id)
  end

end
