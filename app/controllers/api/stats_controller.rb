class Api::StatsController < ApiController
  skip_before_action :authenticate_user!
  skip_authorization_check

  def index
    users = User.all.group_by_day(:created_at).count.map{|k, v| {x: k, y: v}}
    discussions = Discussion.all.group_by_day(:created_at).count.map{|k, v| {x: k, y: v}}
    
    counters = {
      users: User.count,
      workspaces: Workspace.count,
      discussions: Discussion.count,
      messages: Message.count,
      polls: Poll.count,
      missions: Mission.count
    }

    latest = {
      users: User.order(id: :desc).first(10).map do |u|
        {username: u.username, created_at: u.created_at}
      end,
      workspaces: Workspace.order(id: :desc).first(10).map do |u|
        {name: u.name, created_at: u.created_at}
      end,
    }

    stats = {
      users: users,
      discussions: discussions,
      latest: latest,
      counters: counters
    }

    render json: stats
  end

end
