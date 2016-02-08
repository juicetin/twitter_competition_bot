class CreateTweetsTable < ActiveRecord::Migration
  def change
    create_table :tweets_tables do |t|
		# Add id, text, tweeter, 
		# 	*status* (i.e. retweeted, skipped, etc.)
    end
  end
end
