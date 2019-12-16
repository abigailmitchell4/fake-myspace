# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
  has_many :posts, dependent: :destroy

  serialize :liked_posts, Array

  def self.random_post(ids)
  ids = ids.empty? ? [0] : ids
  Post.where("id NOT IN (?)", ids).order("RANDOM()")
  end

  def self.liked(ids)
    ids = ids.empty? ? [0] : ids
    Post.where("id IN (?)", ids)
  end
end
