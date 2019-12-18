# 100.times do
#   name = Faker::Name.name  
#   nickname = Faker::Movies::LordOfTheRings.character
#   image = Faker::Avatar.image(slug: name, size: '100x300', format: 'png', set: 'set4')
#   User.create(name: name, nickname: nickname, image: image)
# end

# 20.times do 
#   Post.create(
#     body: Faker::Lorem.paragraphs(number: 1)
#   )
# end
User.create(
  email: "test@test.com",
  password:'password',
  password_confirmation: "password",
  name: "Abigail",
  nickname: "abbyamour4"
)

15.times do
  u = User.create(
    email: Faker::Internet.email,
    password: 'password',
    password_confirmation: "password",
    name: Faker::Name.first_name, 
    nickname: Faker::Internet.username
  )
  5.times do
    u.posts.create(
      body: Faker::Lorem.paragraph_by_chars(number: 256)
      )
  end
end


puts "data seeded"
