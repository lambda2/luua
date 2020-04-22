
FactoryBot.define do
  factory :email, class: OpenStruct do
    domain_name { 'seacher' }
    to do
      [{ token: 'hello',
         host: "#{domain_name}.#{ENV['DOMAIN_NAME']}",
         email: "hello@#{domain_name}.#{ENV['DOMAIN_NAME']}",
         full: "hello@#{domain_name}.#{ENV['DOMAIN_NAME']}",
         name: nil }]
    end
    from do
      { token: 'andre.aubin.ldaw',
        host: 'gmail.com',
        email: 'andre.aubin.ldaw@gmail.com',
        full: 'André <andre.aubin.ldaw@gmail.com>',
        name: 'André' }
    end
    subject { '(test) Ca va les cocos ?' }
    body { "Mouias ca vaaa\n" + "\n" + 'Hehe' }
    attachments { [] }

    # trait :with_attachment do
    #   attachments {[
    #     ActionDispatch::Http::UploadedFile.new({
    #       filename: 'img.png',
    #       type: 'image/png',
    #       tempfile: File.new("#{File.expand_path File.dirname(__FILE__)}/fixtures/img.png")
    #     })
    #   ]}
    # end
  end
end
