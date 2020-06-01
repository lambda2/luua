class ComputePastRootMessages < ActiveRecord::Migration[6.0]
  def change
    Discussion.all.map do |d|
      d.update_columns(root_message_id: d.messages.where(root: true).first&.id)
    end
  end
end
