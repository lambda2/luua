FactoryBot.define do

  factory :message, class: Message do
    content { Faker::Lorem.sentences.join("\n") }
    discussion
    user

    trait :with_serialized do
      serialized_content do
        {
          "blocks"=> [{
            "key"=>"c3kqe",
            "text"=> content,
            "type"=>"unstyled",
            "depth"=>0,
            "inlineStyleRanges"=>[],
            "entityRanges"=>[{"offset"=>0, "length"=> content.length, "key"=>0}],
            "data"=>{}
          }],
          "entityMap"=> {}
        }.to_json
      end
    end

    trait :with_mentions do
      transient do
        mentions { [create(:user)] }
      end
      serialized_content do
        {
          "blocks"=> [{
            "key"=>"c3kqe",
            "text"=> content,
            "type"=>"unstyled",
            "depth"=>0,
            "inlineStyleRanges"=>[],
            "entityRanges"=>[{"offset"=>0, "length"=> content.length, "key"=>0}],
            "data"=>{}
          }],
          "entityMap"=> mentions.map.with_index do |u, i|
        [
          i.to_s, {
            "type"=>"mention",
            "mutability"=>"IMMUTABLE",
            "data"=> {
              "mention"=> {"name"=> u.username, "slug"=> u.slug, "username"=> u.username, "avatar"=> nil}
            }
          }
        ]
      end.to_h
        }.to_json
      end

    end
  end

end
