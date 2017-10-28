$(document).ready(function() {

    var simon = {
        isOn: false,
        session: [],
        userSession: []
    }

    $('#isOn').on('click', function() {

        simon.isOn = !simon.isOn;
        simon.session.length = 0;
        simon.userSession.length = 0;

        simon.isOn ? $('#isOn').css('background', 'rgb(41, 233, 41)') : $('#isOn').css('background', 'rgb(34, 85, 34)');
        simon.isOn ? $('#screen').html('- -') : $('#screen').html('');
        
    });

    $('#start').on('click', function() {

        $('#start').css('background', 'red');

        randomMove(simon);

    });

    $('#strict').on('click', function() {

        $('#strict').css('background', 'red');
    });

    $('.colorBtn').on('click', function() {

        light($(this).attr('id'));

        simon.userSession.push($(this).attr('id'));
        console.log('user session is: ' + simon.userSession);
        for(var i = 0; i < simon.userSession.length; i++) {
    
            if(simon.userSession[i] === simon.session[i]) {
                if(simon.userSession.length === simon.session.length) {
                    randomMove(simon);
                    if(simon.session.length > 5) {
                        console.log('WIN');
                    }
                }
            }  
            else {
                console.log('WRONG');
            }
        }
    });

});

function randomMove(obj) {

    obj.userSession.length = 0;

    var colors = ['green', 'red', 'yellow', 'blue'];
    var random = Math.floor(Math.random() * colors.length);

    obj.session.push(colors[random]);

    light(colors[random]);

    obj.session.length <= 5 ? $('#screen').html(obj.session.length) : $('#screen').html('WIN');

    console.log('session is: ' + obj.session);
}

function light(color) {

    switch(color) {
        case 'green':
            $('#green').css('background-color', 'rgb(68, 253, 68)');
            break;
        case 'red':
            $('#red').css('background-color', 'rgb(255, 68, 68)');
            break;
        case 'yellow':
            $('#yellow').css('background-color', 'rgb(255, 255, 0)');
            break;
        case 'blue':
            $('#blue').css('background-color', 'rgb(71, 157, 255)');
            break;
    }
}