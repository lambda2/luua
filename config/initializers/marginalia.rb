unless Rails.env.production?
  Marginalia::Comment.components = %i[
    application controller_with_namespace action line
  ]
end
