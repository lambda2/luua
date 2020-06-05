class ApplicationWorker
  include Sidekiq::Worker
  sidekiq_options retry: true, backtrace: true

  def self.delete_all(*args)
    jobs = Sidekiq::ScheduledSet.new.select do |retri|
      retri.klass == to_s && retri.args == args
    end
    jobs.each(&:delete)
  end
end
