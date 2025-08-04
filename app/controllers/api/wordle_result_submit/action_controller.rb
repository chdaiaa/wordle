# frozen_string_literal: true

module Api::WordleResultSubmit
  class ActionController < ApplicationController
    # disables CSRF check, uses
    protect_from_forgery with: :null_session

    def call
      if Wordle::ValidText::Enum.all.exclude?(final_string)
        render(
          json: { error: "Word not recognized. Please try again." },
          status: 422
        )

        return
      end

      if final_string != params[:correct_string]
        head(422)

        return
      end

      head(200)
    end

    private

    def final_string
      params[:input_text].presence&.strip
    end

  end
end


