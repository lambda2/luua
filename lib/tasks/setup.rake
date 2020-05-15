require 'colorize'

namespace :luua do # rubocop:todo Metrics/BlockLength

  def print_logo!
    puts <<-LOGO
  _
 | |   _   _ _   _  __ _
 | |  | | | | | | |/ _` |
 | |__| |_| | |_| | (_| |
 |_____\\__,_|\\__,_|\\__,_|


    LOGO
  end

  def perform_step(title, &block)
    print "      #{title.yellow}\r"
    begin
      is_ok = block.call
      if is_ok
        $stdout.flush # rubocop:todo Style/IdenticalConditionalBranches
        print " #{'OK'.green}   #{title.green} [#{is_ok}]\n"
        is_ok
      else
        $stdout.flush # rubocop:todo Style/IdenticalConditionalBranches
        print " #{'FAIL'.red} #{title.red} [#{is_ok}]\n"
        raise 'Unable to finish setup'
      end
    rescue StandardError => e
      $stdout.flush
      print " #{'FAIL'.red} #{title.red}\n"
      puts e.to_s.red
      raise 'Unable to finish setup'
    end
  end

  # rubocop:todo Metrics/PerceivedComplexity
  # rubocop:todo Metrics/MethodLength
  # rubocop:todo Metrics/AbcSize
  def database_setup! # rubocop:todo Metrics/CyclomaticComplexity # rubocop:todo Metrics/AbcSize # rubocop:todo Metrics/MethodLength # rubocop:todo Metrics/PerceivedComplexity
    perform_step('Checking database setup') { ActiveRecord::Base.connection.current_database }
    perform_step('Checking schema') do
      User.all && Workspace.all && Mission.all && true
    end
    perform_step('Creating admin user') do
      raise 'ADMIN_EMAIL is missing ! Please define `ADMIN_EMAIL` in the .env.local file or as an environement variable.' unless ENV['ADMIN_EMAIL']
      raise 'ADMIN_PASSWORD is missing ! Please define `ADMIN_PASSWORD` in the .env.local file or as an environement variable.' unless ENV['ADMIN_PASSWORD']

      admin = User.find_by_email(ENV['ADMIN_EMAIL']) || User.new(
        email: ENV['ADMIN_EMAIL'],
        password: ENV['ADMIN_PASSWORD'],
        password_confirmation: ENV['ADMIN_PASSWORD'],
        username: 'admin',
        country: Country.friendly.find('france'),
        remote_image_url: 'https://placeimg.com/640/480/people',
        timezone: 'Paris',
        admin: true
      )

      admin.skip_confirmation!
      admin.save && "User '#{admin.email}'".white
    end

    perform_step('Creating admin workspace') do
      raise 'ADMIN_SPACE_NAME is missing ! Please define `ADMIN_SPACE_NAME` in the .env.local file or as an environement variable.' unless ENV['ADMIN_SPACE_NAME']

      admin = User.find_by_email(ENV['ADMIN_EMAIL'])
      ws = Workspace.where(
        name: ENV['ADMIN_SPACE_NAME']
      ).first_or_create
      ws.users << admin unless ws.user_ids.include?(admin.id)

      ws.persisted? && "Workspace '#{ws.name}'".white
    end
  end
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/MethodLength
  # rubocop:enable Metrics/PerceivedComplexity

  desc 'Setup luua for first launch'
  task setup: :environment do |_task, _args|
    print_logo!
    database_setup!
  end

end
