# frozen_string_literal: true

class CreateWordleRecords < ActiveRecord::Migration[8.0]
  def change
    create_table :wordle_records do |t|
      t.string :target_word
      t.boolean :success, null: false, default: false
      t.timestamps
    end
  end
end
