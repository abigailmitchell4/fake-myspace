# 100.times do
#   name = Faker::Name.name  
#   nickname = Faker::Movies::LordOfTheRings.character
#   image = Faker::Avatar.image(slug: name, size: '100x300', format: 'png', set: 'set4')
#   User.create(name: name, nickname: nickname, image: image)
# end

20.times do 
  Post.create(
    body: Faker::Lorem.paragraphs(number: 1)
  )
end


puts "100 users seeded"
