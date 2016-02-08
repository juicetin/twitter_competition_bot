class CreateFollowingTable < ActiveRecord::Migration
  def change
    create_table :following do |t|
		t.string 	:user_id
		t.string 	:user_handle
		t.datetime 	:date_created
    end
  end
end
