class AddAssessmentsAndRecommendationsToRecords < ActiveRecord::Migration[7.0]
  def change
    add_column :records, :assessments, :text, array: true, default: []
    add_column :records, :recommendations, :text, array: true, default: []
  end
end
