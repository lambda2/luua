# frozen_string_literal: true

require 'rails_helper'
require 'devise/jwt/test_helpers'

describe Api::SkillsController do

  let(:category) { create(:skill_category) }
  let(:user) { create(:user, :confirmed) }

  before :each do
    # expect(Skill.count).to eq(0)
    FactoryBot.create_list(:skill, 3, skill_category: category)
  end

  describe '#index' do

    it 'anonymous cant index all skills' do
      json_get "/api/skill_categories/#{category.slug}/skills"
      expect(response.status).to eq(401)
    end

    it 'user can index all skills' do
      json_get "/api/skill_categories/#{category.slug}/skills", user: user
      expect(response.status).to eq(200)
      expect(response.body).to have_item_count_in_json(3)
    end

  end

  # describe '#show' do

  #   let(:skill) { create(:skill) }

  #   it 'on a skill' do
  #     json_get "/api/skills/#{skill.id}", user: user
  #     expect(response.status).to eq(200)
  #     expect(response.body).to match_item_in_json(skill)
  #   end

  #   it 'on a non-existing skill' do
  #     expect do
  #       json_get "/api/skills/0"
  #     end.to raise_error(ActiveRecord::RecordNotFound)
  #   end
  # end
end
