// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

import $ from 'jquery';




function initClickHandler() {
    const $input_field = $(".wordle-game-input-field");
    const $char_button = $(".wordle-game-character-button");
    const $backspace_button = $(".wordle-game-backspace-button");
    const $submit_button = $(".wordle-game-enter-button");

    // Wait for the DOM to be fully loaded
    $(document).ready(function() {
        $char_button.on('click', function(e) {
            const $current_char_button = $(e.currentTarget);

            const $first_blank_input_field = $input_field.not(".filled").first();

            $first_blank_input_field.text($current_char_button.text());
            $first_blank_input_field.addClass("filled");
        });

        $submit_button.on("click", () => {
            const $current_char_button = $(e.currentTarget);

            const $first_blank_input_field = $input_field.not(".filled").first();

            $first_blank_input_field.text($current_char_button.text());
            $first_blank_input_field.addClass("filled");
        })

        $.ajax({
            url: '/api/create',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                alert('Created successfully!');
            },
            error: function(xhr) {
                alert('Failed to create');
            }
        });

        $backspace_button.on("click", function() {
            const $first_blank_input_field = $input_field.filter(".filled").last();

            $first_blank_input_field.text("");
            $first_blank_input_field.removeClass("filled");
        });
    });
}

export default initClickHandler;