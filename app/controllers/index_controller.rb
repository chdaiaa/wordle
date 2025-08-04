# frozen_string_literal: true

class IndexController < ApplicationController
  def show
    render(
      template:     "layouts/index",
      content_type: "text/html",
      locals:       locals,
    )
  end

  private

  def locals
    {
      valid_string: Wordle::ValidText::Enum.all.shuffle.first,
    }
  end

end


