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
      valid_string:     Wordle::ValidText::Enum.all,
      remaining_trial:  remaining_trial,
    }
  end

  def remaining_trial
    params[:remaining_trial] || DEFAULT_REMAINING_TRIAL
  end

  DEFAULT_REMAINING_TRIAL = 6
  private_constant :DEFAULT_REMAINING_TRIAL

end


