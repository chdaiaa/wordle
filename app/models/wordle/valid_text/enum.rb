# frozen_string_literal: true

module Wordle::ValidText
  module Enum
    HELLO = "HELLO"
    WORLD = "WORLD"
    QUITE = "QUITE"
    FANCY = "FANCY"
    FRESH = "FRESH"
    PANIC = "PANIC"
    CRAZY = "CRAZY"
    BUGGY = "BUGGY"

    def self.all
      constants.map do |const|
        const_get(const)
      end
    end

  end
end