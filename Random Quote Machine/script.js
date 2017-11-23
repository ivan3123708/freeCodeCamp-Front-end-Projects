function newQuote() {

    $('#quote').css('display', 'none');
    $('#author').css('display', 'none');

    $.getJSON('https://talaikis.com/api/quotes/random/', function(data) {

        $('#quote')
            .html(data.quote)
            .fadeIn(1000);
        $('#author')
            .html(data.author)
            .delay(300)
            .fadeIn(1000);

        $('.twitter-share-button').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(data.quote) + ' - ' + encodeURIComponent(data.author));
    });
}

$(document).ready(function() {
    newQuote();
});