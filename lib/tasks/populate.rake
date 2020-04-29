namespace :populate do

  desc 'Create some random users and add them to the given workspace'
  task :workspace, [:workspace_id] => [:environment] do |task, args|
    raise unless Rails.env.development?

    puts task.inspect
    puts args.inspect

    FactoryBot.find_definitions
    w = Workspace.friendly.find(args.workspace_id)
    5.times do |_e|
      u = FactoryBot.create(:user)
      w.users << u
    end
  end

end
