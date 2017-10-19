function newQuote() {

    $('#quote').css('display', 'none');
    $('#author').css('display', 'none');

    $.getJSON('https://talaikis.com/api/quotes/random/', function(data) {

        if(data.quote.length > 200) {
            $('#quote').css('font-size', '40px');
        } else if(data.quote.length > 350) {
            $('#quote').css('font-size', '30px');
        } else {
            $('#quote').css('font-size', '50px');
        }

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