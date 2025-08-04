// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import initClickHandler from './controllers/index';

// Initialize event handlers
initClickHandler();
