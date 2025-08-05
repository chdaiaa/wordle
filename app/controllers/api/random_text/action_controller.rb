# frozen_string_literal: true

module Api::RandomText
  class ActionController < ApplicationController
    def call
      render(
        json: { random_text: random_text },
        status: 200
      )
    end

    private

    def random_text
      Wordle::ValidText::Enum.all.shuffle.first
    end

  end
end


