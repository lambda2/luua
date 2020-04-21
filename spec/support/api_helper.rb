require 'rspec/expectations'

module ApiHelper
  def json_get(path, **args)
    # Set Json request headers
    args[:headers] = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    # Add JWT token
    if args[:user]
      u = args.delete(:user)
      args[:headers] = Devise::JWT::TestHelpers.auth_headers(args[:headers], u)
    end

    process(:get, path, **args)
  end
end
