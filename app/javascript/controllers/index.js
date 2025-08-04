// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

import $ from 'jquery';

function initClickHandler() {
    // Wait for the DOM to be fully loaded
    $(document).ready(function() {
        $('.wordle-game-input-field').on('click', function() {
            
        });
    });
}

export default initClickHandler;