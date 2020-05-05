namespace :populate do # rubocop:todo Metrics/BlockLength

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

  desc 'Create some random users and add them to the given workspace'
  task conversation: :environment do # rubocop:todo Metrics/BlockLength
    raise unless Rails.env.development?

    FactoryBot.find_definitions

    w = Workspace.where(slug: 'camelot').first_or_create(
      name: 'Camelot'
    )

    arthur = User.where(username: 'arthur').first_or_create(
      email: 'arthur@luua.io',
      first_name: 'Arthur',
      password: 'camelot', password_confirmation: 'camelot'
    )
    arthur.remote_image_url = 'https://i.pinimg.com/originals/37/66/08/376608ad6a30b2e3df327f6d808be75b.jpg'
    arthur.confirm
    arthur.save
    w.users << arthur unless w.user_ids.include?(arthur.id)

    lancelot = User.where(username: 'lancelot').first_or_create(
      email: 'lancelot@luua.io', first_name: 'Lancelot',
      password: 'camelot', password_confirmation: 'camelot'
    )
    lancelot.remote_image_url = 'https://vignette.wikia.nocookie.net/kaamelott-officiel/images/d/d6/Lancelot_du_Lac.jpg/revision/latest/top-crop/width/360/height/450?cb=20151111223406&path-prefix=fr'
    lancelot.confirm
    lancelot.save
    w.users << lancelot unless w.user_ids.include?(lancelot.id)

    perceval = User.where(username: 'perceval').first_or_create(
      email: 'perceval@luua.io', first_name: 'Perceval',
      password: 'camelot', password_confirmation: 'camelot'
    )
    perceval.remote_image_url = 'https://fr.web.img3.acsta.net/videothumbnails/17/05/19/17/21/437077.jpg'
    perceval.confirm
    perceval.save
    w.users << perceval unless w.user_ids.include?(perceval.id)

    m = Mission.where(workspace: w, name: 'Ambidextrie', visibility: 'public').first_or_create

    discussion = Discussion.where(resource: m).first_or_create(
      name: 'Ambidextrie',
      user: arthur
    )

    discussion.messages.destroy_all

    puts "Discussion: #{discussion.inspect}"

    messages = [
      [arthur, 'Mais c’est pas compliqué, bon Dieu ! Y a Calogrenant à droite, Léodagan à gauche, et nous on arrive par le milieu !'],
      [lancelot, 'C’est bon jusque là ?'],
      [perceval, 'Attendez, moi, si je me souviens bien du coin, il y a la rivière qui passe en travers !'],
      [arthur, 'Ah, mais merde avec votre rivière !'],
      [perceval, 'C’est un point de repère comme un autre !'],
      [lancelot, 'Mais bon Dieu, il y a pas besoin de point de repère puisque les envahisseurs vont nous attaquer de face !'],
      [perceval, 'De face, ça va ! C’est le reste qui va pas !'],
      [arthur, 'Mais quoi, nom d’un chien !?'],
      [perceval, 'Ben la gauche, la droite, là ! Moi j’aime pas ces trucs !'],
      [lancelot, 'Mais qu’est ce que vous aimez pas ?'],
      [perceval, 'Ces conneries de gauche et de droite ! Ça veut rien dire ces machins ! Selon comme on est tourné ça change tout !'],
      [arthur, 'Mais qu’est ce que vous nous chantez ?'],
      [perceval, 'Moi j’estime que quand on parle tactique militaire, il faut employer des termes précis !'],
      [lancelot, 'Ben oui, effectivement, ça peut prêter à confusion …'],
      [arthur, 'Non mais attendez, nous c’est pour vous qu’on dit gauche et droite ! C’est pour pas vous embrouiller !'],
      [perceval, 'Si, ça m’embrouille !'],
      [lancelot, 'Ah bon ? On peut parler normalement alors ?'],
      [perceval, 'Professionnel !'],
      [arthur, 'Bon, ben alors, OK, on reprend depuis le début ; donc, Calogrenant est posté depuis hier soir au Nord-Est de la zone d’attaque…'],
      [lancelot, '…Léodagan, Sud-Sud-Est, un peu plus en retrait avec ses cavaliers…'],
      [perceval, 'Moi j’aime pas ces histoires de Sud-Est, Nord-Ouest, et tous ces machins !'],
      [arthur, 'Quoi, qu’est ce qu’il y a qui va pas encore ?!'],
      [perceval, 'C’est un coup à se planter ça ! De toutes façons, on dit le Nord ! Selon comme on est tourné ça change tout !']
    ].each do |user, message|
      Message.create(discussion: discussion, user: user, content: message)
    end
  end
end
