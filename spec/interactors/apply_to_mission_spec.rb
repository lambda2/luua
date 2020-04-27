require 'rails_helper'

RSpec.describe ApplyToMission, type: :interactor do
  let (:mission) { create(:mission) }
  let (:workspace) { mission.workspace }
  let (:user) { create(:user) }
  subject(:context) { ApplyToMission.call(mission: mission, user: user) }

  describe ".call" do
    context "when user candidated" do

      it "succeeds" do
        expect(context).to be_a_success
      end

      it "provides the mission_user" do
        expect(context.mission_user).not_to be(nil)
      end
    end

    context "when given invalid mission" do
      before do
        allow(MissionUser).to receive(:new).and_return(MissionUser.new)
      end

      it "fails" do
        expect(context).to be_a_failure
      end
    end
  end
end
