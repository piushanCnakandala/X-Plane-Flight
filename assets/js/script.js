$(function (){

    //saving dom objects to variables
    var gameBoard = $('#gameBoard');
    var playerPlane = $('#playerPlane');
    var attackedPlane1 =$('#attackedPlane1');
    var attackedPlane2 =$('#attackedPlane2');
    var attackedPlane3 =$('#attackedPlane3');
    var attackedPlane4 =$('#attackedPlane4');

    var game_over = false;
    var score_counter = 1;
    var speed = 2;
    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;





    $(document).on('keydown', function (e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            }
        }
    });

    $(document).on('keyup', function (e) {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            }
        }
    });

    function left() {
        if (game_over === false && parseInt(playerPlane.css('left')) > 0) {
            playerPlane.css('left', parseInt(playerPlane.css('left')) - 5);
            move_left = requestAnimationFrame(left);
        }
    }

});

