class CreateFollowingTable < ActiveRecord::Migration
  def change
    create_table :following_tables do |t|
		# Add id, name, date of follow
    end
  end
end
