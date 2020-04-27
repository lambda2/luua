require 'rails_helper'

RSpec.describe CancelMission, type: :interactor do
  let (:mission) { create(:mission) }
  let (:mission_user) { create(:mission_user, mission: mission) }
  let (:workspace) { mission.workspace }
  let (:user) { create(:user) }
  subject(:context) { CancelMission.call(workspace: workspace, mission_user: mission_user, user: user) }

  describe ".call" do
    context "when user candidated" do

      before do
        allow(mission_user).to receive(:cancel!).and_return(true)
      end

      it "succeeds" do
        expect(context).to be_a_success
      end

      it "provides the mission_user" do
        expect(context.mission_user).to eq(mission_user)
      end
    end

    context "when given invalid mission user" do
      before do
        allow(mission_user).to receive(:cancel!).and_return(false)
      end

      it "fails" do
        expect(context).to be_a_failure
      end
    end
  end
end
