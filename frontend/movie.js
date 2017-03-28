var url = "https://api.themoviedb.org/3/search/movie?";
var apiKey = "api_key=50c1cc8af5a5e07e52ed728d348a4919";
var query = "query=";
var posterUrl = "http://image.tmdb.org/t/p/w150";
var cacheUrl = "http://localhost:5000/reviews/movies";

var findMovie = function(name, page){
    var data = "{}";

    var xhr = new XMLHttpRequest();
    //xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === this.DONE) {
        console.log(JSON.parse(this.responseText));
        listMovies(JSON.parse(this.responseText));
      }
    });

    xhr.open("GET", url +"page="+ page + "&" + query + name +"&"+apiKey);
    
    xhr.send(data);
}

var post = function (oData, postURL) {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  
  xmlhttp.open("POST", postURL, true);
  xmlhttp.setRequestHeader("content-type", "application/json");
  xmlhttp.setRequestHeader("cache-control", "no-cache");
  xmlhttp.send(JSON.stringify(oData));
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));
    }
    if(this.status == 400){
        console.log(this.responseText)
    }
  };
}

var listMovies = function(data){
    var container = document.getElementById('container');
    var list = document.createElement('ul');
    list.classList.add('list-group');
    var listElement = document.createElement('li');
    listElement.classList.add('list-group-item');
    listElement.id = 'results';
    var gridContainer = document.createElement('div');
    gridContainer.id = 'grid';
    gridContainer.classList.add('container-fluid');

    var movieRow = document.createElement('div');
    movieRow.id = 'rowResult';
    movieRow.classList.add('row');
    var colIdx = 1;
    for(var idx = 0; idx < data.results.length; ++idx){

        if(colIdx == 3){
            gridContainer.appendChild(movieRow);
            colIdx = 0;
            var movieRow = document.createElement('div');
            movieRow.id = 'rowResult';
            movieRow.classList.add('row');
        }
        
        var movieContainer = document.createElement('div');
        movieContainer.setAttribute('class', 'col-md-3');
        // movieContainer.classList.add("col-md-3");
        movieContainer.id = 'movie';

        var title = document.createElement('h2');
        var release_date = document.createElement('h3');
        var poster = document.createElement('img');
        var vote_avg = document.createElement('h2');

        title.id = 'title';
        release_date.id = 'release_date';
        poster.id = 'poster';
        vote_avg.id = 'vote_avg';

        title.innerHTML = data.results[idx].title;
        release_date.innerHTML = data.results[idx].release_date;
        poster.setAttribute('src', posterUrl + data.results[idx].poster_path);
        vote_avg.innerHTML = data.results[idx].vote_average;

        saveToCache(data.results[idx]); //Saving to local database

        movieContainer.appendChild(title);
        movieContainer.appendChild(release_date);
        movieContainer.appendChild(poster);
        movieContainer.appendChild(vote_avg);

        movieRow.appendChild(movieContainer);
        colIdx++;
    }
    listElement.appendChild(gridContainer);
    list.appendChild(listElement);
    container.appendChild(list);
    
};

var saveToCache = function(moviesData){
    post(moviesData, cacheUrl);
    console.log(moviesData);
};

var form = document.getElementById('create');
form.onsubmit = function(evt) {
    evt.preventDefault();
    var name = document.getElementById('name');
    
    findMovie(name.value, 1);
    name.value = '';
};
