$(function (){

    // dom objects to variables

    var gameBoard = $('#gameBoard');
    var playerPlane = $('#playerPlane');
    var attackedPlanes=$('#AttackedPlanes')
    var attackedPlane1 =$('#attackedPlane1');
    var attackedPlane2 =$('#attackedPlane2');
    var attackedPlane3 =$('#attackedPlane3');
    var attackedPlane4 =$('#attackedPlane4');
    var gameLine =$('#gameLine')
    var restart_div = $('#restart_div');
    var restart_btn = $('#restart');

    var game_over = false;
    var score_counter = 1;
    var speed = 2;
    var move_right = false;
    var move_left = false;


    var gameBoard_left = parseInt(gameBoard.css('left'));
    var gameBoard_width = parseInt(gameBoard.width());
    var gameBoard_height = parseInt(gameBoard.height());
    var playerPlane_width = parseInt(playerPlane.width());
    var playerPlane_height = parseInt(playerPlane.height());



                  /////////////////////////////////////////////////////////////////////

         /*  player plane moved (left,right)*/

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

    function right() {
        if (game_over === false && parseInt(playerPlane.css('left')) < gameBoard_width-playerPlane_width) {
            playerPlane.css('left', parseInt(playerPlane.css('left')) + 5);
            move_right = requestAnimationFrame(right);
        }
    }



    //////////////////////////////////////////////////////////////////////////////
                   /*Attacked planes moved*/

    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (collision(gameLine, attackedPlane1) || collision(gameLine, attackedPlane2) || collision(gameLine, attackedPlane3) || collision(gameLine, attackedPlane4)) {
            stop_the_game();
            return;
        }

        attackedPlane_down(attackedPlane1);
        attackedPlane_down(attackedPlane2);
        attackedPlane_down(attackedPlane3);
        attackedPlane_down(attackedPlane4);


        anim_id = requestAnimationFrame(repeat);
    }

    ////////////////////////////////////////////////////////////////////////////////
                    /*other method*/



    function attackedPlane_down(AttackedPlane) {
        var car_current_top = parseInt(AttackedPlane.css('top'));
        if (car_current_top > gameBoard_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (gameBoard_width - playerPlane_width));
            AttackedPlane.css('left', car_left);
        }
       AttackedPlane.css('top', car_current_top + speed);
    }


    restart_btn.click(function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.slideDown();
        restart_btn.focus();
    }

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }


});

