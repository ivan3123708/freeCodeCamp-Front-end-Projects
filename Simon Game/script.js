var sounds = {
    green: new Audio('audio/sound1.mp3'),
    red: new Audio('audio/sound2.mp3'),
    yellow: new Audio('audio/sound3.mp3'),
    blue: new Audio('audio/sound4.mp3')
};

$(document).ready(function() {

    var simon = {
        isOn: false,
        strict: false,
        session: [],
        userSession: []
    }

    $('#isOn').on('click', function() {

        simon.isOn = !simon.isOn;
        simon.session.length = 0;
        simon.userSession.length = 0;

        $('#start').css('background', 'rgb(116, 29, 29)');
        $('#strict').css('background', 'rgb(116, 29, 29)');

        simon.isOn ? $('#isOn').css('background', 'rgb(41, 233, 41)') : $('#isOn').css('background', 'rgb(34, 85, 34)');
        simon.isOn ? $('#screen').html('--') : $('#screen').html('');
    });


    $('#start').click(function() {

        if(simon.isOn) {

            $('#start').css('background', 'red');
            $('#screen').html('***');

            simon.session.length = 0;
            simon.userSession.length = 0;

            randomMove(simon);
        }
    });
    
    $('#strict').on('click', function() {

        if(simon.isOn) {

            $('#strict').css('background', 'red');

            simon.strict = !simon.strict;

        }
    });

    $('.colorBtn').on('click', function() {

        if(simon.isOn) {

            sounds[$(this).attr('id')].play();

            lightOn($(this).attr('id'));
            
            simon.userSession.push($(this).attr('id'));
            console.log('user session is: ' + simon.userSession);
            for(let j = 0; j < simon.userSession.length; j++) {
        
                if(simon.userSession[j] === simon.session[j]) {
                    if(simon.userSession.length === simon.session.length) {
                        if(simon.userSession[simon.userSession.length - 1] === simon.session[simon.session.length -  1]) {
                            if(simon.session.length >= 3) {
                                console.log('WIN');
                                $('#screen').html('WIN');
                                setTimeout(function() {
                                   start(simon); 
                                }, 3000);
                            } else {
                                randomMove(simon);
                            }
                        } else {
                            $('#screen').html('WRONG');
                            wrong(simon);
                        }
                    }
                }
                else {
                    $('#screen').html('WRONG');
                    
                    wrong(simon);
                }
            }
        }
    });

});

function randomMove(obj) {

    obj.userSession.length = 0;

    var colors = ['green', 'red', 'yellow', 'blue'];
    var random = Math.floor(Math.random() * colors.length);

    obj.session.push(colors[random]);

    for(let i = 0; i < obj.session.length; i++) {
        setTimeout(function() {
            sounds[obj.session[i]].play();
            lightOn(obj.session[i]);
            $('#screen').html(obj.session.length);
        }, 2000 + i * 1000);
        
    }

    console.log('session is: ' + obj.session);
}

function lightOn(color) {

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

    setTimeout(function() {
        
        switch(color) {
            case 'green':
                $('#green').css('background-color', 'rgb(0, 212, 0)');
                break;
            case 'red':
                $('#red').css('background-color', 'rgb(212, 0, 0)');
                break;
            case 'yellow':
                $('#yellow').css('background-color', 'rgb(209, 209, 0)');
                break;
            case 'blue':
                $('#blue').css('background-color', 'rgb(0, 96, 206)');
                break;
        }
    }, 900);
}

function wrong(obj) {

    if(!obj.strict) {

        for(let i = 0; i < obj.session.length; i++) {
            setTimeout(function() {
                sounds[obj.session[i]].play();
                lightOn(obj.session[i]);
                obj.session.length <= 5 ? $('#screen').html(obj.session.length) : $('#screen').html('WIN');
            }, 3000 + i * 1000);
            
        }

    } else {

        start(obj);
    }
}

function start(obj) {

    $('#start').css('background', 'red');
    $('#screen').html('***');

    obj.session.length = 0;
    obj.userSession.length = 0;

    setTimeout(function() {
        randomMove(obj);
    }, 2000);
    
}