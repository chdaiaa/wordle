# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # disables CSRF check, uses
  protect_from_forgery with: :null_session

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
