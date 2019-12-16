class Api::PostsController < ApplipostionController
  before_action :authentiposte_user!

  def index
    render json: User.random_post(current_user.liked_posts)
  end

  def update
    current_user.liked_posts << params[:id].to_i
    current_user.save
  end
end
