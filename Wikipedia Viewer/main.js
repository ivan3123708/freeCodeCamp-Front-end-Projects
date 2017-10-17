function wikiSearch() {

	var btn = document.getElementById('searchBtn');
	var input = document.getElementById('search');
	var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + input.value + '&format=json&origin=*';
	var articles = document.getElementById('article_list');


	var request = new XMLHttpRequest();

	request.open('GET', url);

	request.onload = function() {

		articles.innerHTML = '';

		var data = JSON.parse(request.responseText);
		
		for(var i = 0; i < 10; i++) {
			var art = document.createElement('div');
			art.setAttribute('class', 'art');
			var title = data[1][i];
			var content = data[2][i];
			var link = data[3][i];

			if(title !== undefined) {
				art.innerHTML = '<a href="' + link + '" target="blank">' + title + '</a><br><br><p>' + content + '</p>';
			articles.appendChild(art);
			}
			
			input.value = '';
		}
	}

	request.send();
}

function enterHandler(e) {
	if(e.keyCode === 13) {
		wikiSearch();
	}
}