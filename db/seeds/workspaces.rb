if Rails.env.development?

  puts 'Creating User !'
  andre = User.find_by_email('andre@luua.io') || User.new(
    email: 'andre@luua.io',
    password: 'andre?',
    password_confirmation: 'andre?',
    username: 'andre',
    first_name: 'André',
    last_name: 'Aubin',
    country: Country.friendly.find('france'),
    remote_image_url: 'https://placeimg.com/640/480/people',
    timezone: 'Paris',
    admin: false
  )

  andre.skip_confirmation!
  andre.save

  puts 'Creating admin Org !'
  o = Organization.where(
    name: 'Luua',
    organization_type: 'company',
    country: Country.friendly.find('france'),
    region: Region.friendly.find('europe')
  ).first_or_create

  puts 'Creating admin Workspace !'
  ws = Workspace.where(
    name: 'Luua',
    organization: o
  ).first_or_create
  ws.users << andre

  # ================ Trefle EXAMPLE ===================

  tuser = User.find_by_email('thierry@trefle.io') || User.new(
    email: 'thierry@trefle.io',
    password: 'thierry',
    password_confirmation: 'thierry',
    username: 'thierry',
    first_name: 'Thierry',
    last_name: 'Trefle',
    country: Country.friendly.find('france'),
    remote_image_url: 'https://placeimg.com/640/480/people',
    timezone: 'Paris',
    admin: false
  )
  tuser.skip_confirmation!
  tuser.save

  puts 'Creating trefle Org !'
  o = Organization.where(
    name: 'Trefle',
    organization_type: 'company',
    country: Country.friendly.find('france'),
    region: Region.friendly.find('europe')
  ).first_or_create

  puts 'Creating client Workspace !'
  trefle = Workspace.where(
    name: 'Trefle',
    organization: o
  ).first_or_create(remote_image_url: 'https://placeimg.com/640/480/tech')
  trefle.users << tuser

  # ================ MASHU EXAMPLE ===================

  muser = User.find_by_email('marine@mashu.io') || User.new(
    email: 'marine@mashu.io',
    password: 'marine',
    password_confirmation: 'marine',
    username: 'marine',
    first_name: 'Marine',
    last_name: 'Mashu',
    country: Country.friendly.find('france'),
    remote_image_url: 'https://placeimg.com/640/480/people',
    timezone: 'Paris',
    admin: false
  )
  muser.skip_confirmation!
  muser.save

  puts 'Creating mashu Org !'
  o = Organization.where(
    name: 'Mashu',
    organization_type: 'association',
    region: Region.friendly.find('internet')
  ).first_or_create

  puts 'Creating client Workspace !'
  mashu = Workspace.where(
    name: 'Mashu',
    organization: o
  ).first_or_create(remote_image_url: 'https://placeimg.com/640/480/tech')
  mashu.users << muser

  Mission.where(
    name: 'Review mashu videos'
  ).first_or_create!(
    description: 7.times.map { Faker::Lorem.sentences.join(', ') }.join("\n"),
    visibility: :public,
    created_by: muser,
    workspace: mashu
  )

  Mission.where(
    name: 'Review tags (protected)'
  ).first_or_create!(
    description: 7.times.map { Faker::Lorem.sentences.join(', ') }.join("\n"),
    visibility: :protected,
    created_by: muser,
    workspace: mashu
  )

  Mission.where(
    name: 'Remove inactive users (hidden)'
  ).first_or_create!(
    description: 7.times.map { Faker::Lorem.sentences.join(', ') }.join("\n"),
    visibility: :hidden,
    created_by: muser,
    workspace: mashu
  )

end
