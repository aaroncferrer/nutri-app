class ChangeAssessmentsAndRecommendationsToText < ActiveRecord::Migration[6.0]
  def change
    change_column :records, :assessments, :text
    change_column :records, :recommendations, :text
  end
end
