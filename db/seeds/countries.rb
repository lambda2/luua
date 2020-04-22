if Rails.env.test?
  Country.where(name: 'France').first_or_create!
else
  ISO3166::Country.all.map do |c|
    puts "#{c.emoji_flag}  Adding country #{c.name}"
    Country.where(name: c.name).first_or_create!
  end
end

Region.where(name: 'World').first_or_create!
Region.where(name: 'Internet').first_or_create!
