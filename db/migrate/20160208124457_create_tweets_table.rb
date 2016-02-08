class CreateTweetsTable < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
		t.string 	:tweet_id
		t.string 	:tweet_user_id
		t.string 	:tweet_text
		t.string 	:status
		t.datetime 	:date_created
    end
  end
end
