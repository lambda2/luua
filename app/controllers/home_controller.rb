class HomeController < ApiController
  
  skip_authorization_check
  skip_before_action :authenticate_user!

  def index

    render json: {
      hello: :world,
      release: ENV['SENTRY_RELEASE']
    }
  end

end
