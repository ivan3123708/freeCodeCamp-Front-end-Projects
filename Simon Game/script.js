$(document).ready(function() {

    var simon = {
        isOn: false,
        session: [],
        userSession: [],
        count: function() {
            return this.session.length;
        }
    }

    $('#isOn').on('click', function() {
        simon.isOn = !simon.isOn;
        simon.isOn ? $('#screen').html('- -') : $('#screen').html('');
    });

    $('#start').on('click', function() {

        var colors = ['green', 'red', 'yellow', 'blue'];
        var random = Math.floor(Math.random() * colors.length);

        simon.session.push(colors[random]);
        
        switch(colors[random]) {
            case 'green':
                $('#green').css('background-color', '#5dff00');
                break;
            case 'red':
                $('#red').css('background-color', '#ff0000');
                break;
            case 'yellow':
                $('#yellow').css('background-color', '#fffa00');
                break;
            case 'blue':
                $('#blue').css('background-color', '#0077ff');
                break;
        }
    });

    $('.colorBtn').on('click', function() {
        simon.session.push($(this).attr('id'));
        $('#screen').html(simon.count());
    });

    

});