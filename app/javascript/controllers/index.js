
// region external module
import $ from 'jquery';
// endregion external module




function initClickHandler() {
    var current_attempt = 0;

    var notyf = new Notyf();

    const $input_row = $(".wordle-game-input-pad-row");
    const $char_button = $(".wordle-game-character-button");

    const $submit_button = $(".wordle-game-enter-button");

    const correct_text = $submit_button.data("valid-string")

    // Wait for the DOM to be fully loaded
    $(document).ready(function() {
        $char_button.on('click', function(e) {
            if ( $input_row.hasClass("gameover") ) {
                return
            }

            const $current_char_button = $(e.currentTarget);

            const $current_active_row = $input_row.filter(".active");

            const $first_blank_input_field = $current_active_row.find(".wordle-game-input-field").not(".filled").first();

            $first_blank_input_field.text($current_char_button.text());
            $first_blank_input_field.addClass("filled");
        });

        $submit_button.on("click", function()  {
            if ( $input_row.hasClass("gameover") ) {
                return
            }

            var input_text = "";

            const $current_active_row = $input_row.filter(".active");

            $current_active_row.find(".wordle-game-input-field").each((_idx, el) => {
                const $current_input_field = $(el);

                input_text += $current_input_field.text().trim();
            })

            if ( input_text.length < 5 ) {
                notyf.error({
                    message: "Guess must be a 5-letter word.",
                    position: {
                        x: "center",
                        y: "top",
                    }
                });

                return;
            }

            const form_data = {
                input_text:     input_text,
                correct_string: correct_text,
            }

            $.ajax({
                url:        $submit_button.attr("action"),
                type:       "POST",
                dataType:   "json",
                data:       form_data, // Send JSON stringified data
                error: function(xhr) {
                    if ( xhr.status === 200 ) {
                        $input_row.eq(current_attempt).find(".wordle-game-input-field").each((idx, el) => {
                            $(el).addClass("correct")
                            $char_button.filter(`[data-val=${$(el).text().trim()}]`).addClass("correct")
                        })

                        notyf.success({
                            message: "You win this game",
                            position: {
                                x: "center",
                                y: "top",
                            },
                            duration: 0,
                        });

                        $input_row.addClass("gameover")

                        return
                    }

                    if ( xhr.responseJSON ) {
                        notyf.error({
                            message: xhr.responseJSON.error,
                            position: {
                                x: "center",
                                y: "top",
                            }
                        });
                    }
                    else {
                        $input_row.eq(current_attempt).find(".wordle-game-input-field").each((idx, el) => {
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
                    }

                    current_attempt++;

                    if ( current_attempt < 6 ) {
                        $input_row.removeClass("active");
                        $input_row.eq(current_attempt).addClass("active");
                    }
                    else {
                        $input_row.addClass("gameover")
                    }

                }
            });
        })


        $(".wordle-game-backspace-button").on("click", function() {
            if ( $input_row.hasClass("gameover") ) {
                return
            }

            const $current_active_row = $input_row.filter(".active");
            const $first_blank_input_field = $current_active_row.find(".wordle-game-input-field").filter(".filled").last();

            $first_blank_input_field.text("");
            $first_blank_input_field.removeClass("filled");
        });
    });

}

export default initClickHandler;