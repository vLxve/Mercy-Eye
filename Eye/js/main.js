var Eye = RegisterApp('Eye');
var InEye = false;
var HexgonStyleObject = {
    textShadow: "#08f7c5 0px 0 20px",
    webkitTextStroke: "1.5px #08f7c5"
};

function applyHexagonStyles() {
    $('#hex').css({
        'text-shadow': HexgonStyleObject.textShadow,
        '-webkit-text-stroke': HexgonStyleObject.webkitTextStroke
    });
}

function updateHexagonStyles() {
    $('#hex::before').css({
        'text-shadow': HexgonStyleObject.textShadow,
        '-webkit-text-stroke': HexgonStyleObject.webkitTextStroke
    });
}

Eye.addNuiListener('ToggleEye', (Data) => {
    $('.eye').removeClass('fas fa-eye').addClass('fas fa-eye');
    $('.eye-options').empty();
    
    InEye = Data.State;
    if (InEye) {
        $('.eye-wrapper').show().css('pointer-events', 'auto');
        applyHexagonStyles();
    } else {
        $('.eye-wrapper').hide().css('pointer-events', 'none');
        $('.eye-options').removeClass('show-options');
        $('#hex').css({
            'text-shadow': 'none',
            '-webkit-text-stroke': 'none'
        });

        $('#hex').removeClass('active-text-shadow');

        $('.eye').css('color', '#3c575767');
    }
});

Eye.addNuiListener('SetOptions', (Data) => {
    const $eye = $('.eye');
    const $eyeOptions = $('.eye-options');
    const $hex = $('#hex');

    $eyeOptions.empty();

    if (Data.Options.length >= 1) {
        $eye.removeClass('fas fa-eye').addClass('fas fa-eye');

        $eye.css('color', '#08f7c5');

        let Options = '';
        for (let i = 0; i < Data.Options.length; i++) {
            const Elem = Data.Options[i];
            Options += `<div data-parent="${Elem.Parent}" data-name="${Elem.Name}" class="option archivo" style="color: ${this.StandardColor}; background-color: rgba(8, 247, 197, 0.3); border-radius: 8px; padding: 5px 5px; margin-bottom: 5px; box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);">
                            <i class="${Elem.Icon || 'fas fa-eye'}"></i> ${Elem.Label}
                        </div>`;
        }

        HexgonStyleObject.textShadow = "#3c575767 0px 0 20px";
        HexgonStyleObject.webkitTextStroke = "1.5px #08f7c5";
        updateHexagonStyles();

        $hex.addClass('active-text-shadow');
        $eyeOptions.html(Options)
    } else {
        $eye.removeClass('fas fa-eye').addClass('fas fa-eye');
        HexgonStyleObject.textShadow = "none"; 
        HexgonStyleObject.webkitTextStroke = "none";
        updateHexagonStyles();

        $eye.css('color', '#3c575767');

        $hex.removeClass('active-text-shadow');
    }
});

$(document).on('click', '.eye-options .option', function(e){
    e.preventDefault();
    if (InEye) {
        $.post("https://vlxve-ui/Eye/Click", JSON.stringify({
            Parent: $(this).attr("data-parent"),
            Name: $(this).attr("data-name"),
        }));
    }
});

$(document).keyup(function(e){
    if (!InEye) return;

    switch (e.keyCode) {
        case 27:
            $.post("https://vlxve-ui/Eye/Close");
            break;
    }
});

window.addEventListener("mousedown", function onEvent(event) {
    if (!InEye) return;

    if (event.button == 2) {
        $.post("https://vlxve-ui/Eye/Unfocus");
    }
});
