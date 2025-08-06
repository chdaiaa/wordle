
// region external module
import $ from "jquery";
// endregion external module


// region constant

const notyf = new Notyf();

const $input_pad = $(".wordle-game-input-pad");
const $char_button = $(".wordle-game-character-button");

const $submit_button = $(".wordle-game-enter-button");
const $random_guess_button = $(".wordle-random-guess-button");
const $backspace_button = $(".wordle-game-backspace-button");
const $revert_button = $(".wordle-game-revert-button");

// endregion constant


function initClickHandler() {
    const correct_text = $submit_button.data("valid-string")

    // Wait for the DOM to be fully loaded
    $(document).ready(function() {
        $char_button.on('click', function(e) {
            const $current_char_button = $(e.currentTarget);

            if ( $input_pad.hasClass("game-over") || $current_char_button.hasClass("disabled") ) {
                return
            }

            $backspace_button.addClass("active");
            $backspace_button.removeClass("disabled");
            $revert_button.removeClass("active");

            const $current_active_row = $input_pad.find(".wordle-game-input-pad-row").last();
            const $first_blank_input_field = $current_active_row.find(".wordle-game-input-field").not(".filled").first();

            $first_blank_input_field.text($current_char_button.text());
            $first_blank_input_field.addClass("filled");

            if ( $current_active_row.find(".wordle-game-input-field").not(".filled").length === 0 ) {
                $submit_button.removeClass("disabled");
                $revert_button.removeClass("disabled");
            }

            if ( $current_active_row.find(".wordle-game-input-field").filter(".filled").length > 0 ) {
                $random_guess_button.addClass("disabled");
            }
        });

        $random_guess_button.on("click", function () {
            if ( $input_pad.hasClass("game-over") ) {
                return
            }

            $revert_button.removeClass("disabled");

            const $current_active_row = $input_pad.find(".wordle-game-input-pad-row").last();

            $.ajax({
                url:        $random_guess_button.attr("action"),
                type:       "GET",
                dataType:   "json",
                success:    function (xhr) {
                    const input_text = xhr.random_text;

                    $current_active_row.find(".wordle-game-input-field").each((_idx, el) => {
                        $(el).text(input_text.charAt(_idx));
                        $(el).addClass("filled");
                    })

                    on_submit()
                },
            })
        })

        $submit_button.on("click", function()  {
            if ( $input_pad.hasClass("game-over") ) {
                return
            }

            on_submit()
        })

        $revert_button.on("click", function () {
            if ( $input_pad.hasClass("game-over") || $revert_button.hasClass("disabled") ) {
                return;
            }

            $input_pad.find(".wordle-game-input-pad-row").last().remove();

            $revert_button.removeClass("active");
            $backspace_button.addClass("active");
            $random_guess_button.addClass("disabled");
        })

        $backspace_button.on("click", function() {
            if ( $input_pad.hasClass("game-over") ) {
                return;
            }

            const $current_active_row = $input_pad.find(".wordle-game-input-pad-row").last();
            const $last_filled_input_field = $current_active_row.find(".wordle-game-input-field").filter(".filled").last();
            const $target_char_button = $char_button.filter(`[data-val=${$last_filled_input_field.text().trim()}]`);

            $last_filled_input_field.text("");
            remove_extra_class($last_filled_input_field, "wordle-game-input-field");
            remove_extra_class($target_char_button,"wordle-game-character-button");

            if ( $current_active_row.find(".wordle-game-input-field").filter(".filled").length === 0 ) {
                $revert_button.addClass("active");
                $backspace_button.removeClass("active");
                $random_guess_button.removeClass("disabled");

                if ( $input_pad.find(".wordle-game-input-pad-row").length === 1 ) {
                    $revert_button.addClass("disabled");
                }
            }
        });
    });

    function on_submit() {
        var input_text = "";

        const $current_active_row = $input_pad.find(".wordle-game-input-pad-row").last();

        $current_active_row.find(".wordle-game-input-field").each((_idx, el) => {
            const $current_input_field = $(el);

            input_text += $current_input_field.text().trim();
        })

        $.ajax({
            url:        $submit_button.attr("action"),
            type:       "POST",
            dataType:   "json",
            data:       {
                input_text:      input_text,
                correct_string:  correct_text,
                attempt:         $input_pad.find(".wordle-game-input-pad-row").length,
            },
            error: function(xhr) {
                if ( xhr.status === 200 ) {
                    $current_active_row.find(".wordle-game-input-field").each((idx, el) => {
                        $(el).addClass("correct")
                        $char_button.filter(`[data-val=${$(el).text().trim()}]`).addClass("correct")
                    })

                    flash_message("success", "You win this game", 0);

                    $input_pad.addClass("game-over")

                    return
                }

                if ( xhr.responseJSON ) {
                    flash_message("error", xhr.responseJSON.error, 2000);
                }
                else {
                    $current_active_row.find(".wordle-game-input-field").each((idx, el) => {
                        for ( var i = 0; i < $submit_button.data("valid-string").length; i++ ) {
                            if ( correct_text.charAt(idx) === $(el).text().trim() ) {
                                if ( $(el).data("column-index") === idx) {
                                    $(el).addClass("correct")
                                    $char_button.filter(`[data-val=${$(el).text().trim()}]`).addClass("correct")
                                }
                                else {
                                    $(el).addClass("present")
                                    $char_button.filter(`[data-val=${$(el).text().trim()}]`).addClass("present")
                                }
                            }
                            else {
                                $(el).addClass("absent")
                                $char_button.filter(`[data-val=${$(el).text().trim()}]`).addClass("absent")
                            }
                        }
                    })

                    // region add new row

                    const $new_input_row = $current_active_row.clone();

                    $new_input_row.find(".wordle-game-input-field").each((idx, el) => {
                        $(el).text("");

                        remove_extra_class($(el), "wordle-game-input-field");
                    })

                    $input_pad.append($new_input_row);

                    $backspace_button.removeClass("active");
                    $revert_button.addClass("active");
                    $random_guess_button.removeClass("disabled");

                    $(window).scrollTop(document.body.scrollHeight);

                    // endregion add new row
                }

            }
        });
    }

    function remove_extra_class($element, original_class) {
        $element.attr("class").split(/\s+/).forEach((className) => {
            if ( className === original_class ) {
                return;
            }

            $element.removeClass(className);
        })
    }

    function flash_message(type, message, duration) {
        const payload = {
            message: message,
            position: {
                x: "center",
                y: "top",
            },
            duration: duration,
        }

        switch (type){
            case "error":
                notyf.error(payload);

                break;

            default:
                notyf.success(payload);

        }
    }
}


export default initClickHandler;