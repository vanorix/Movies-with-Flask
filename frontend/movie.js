var url = "https://api.themoviedb.org/3/search/movie?";
var apiKey = "api_key=50c1cc8af5a5e07e52ed728d348a4919";
var query = "query=";
var posterUrl = "http://image.tmdb.org/t/p/w150";
var cacheUrl = "http://localhost:5000/reviews/movies";

//Paging
var resultPages;
var currentPage = 1;
var currentSearch;

//Create Button Elements
var btnNext = document.createElement('button');
btnNext.classList.add('btn');
btnNext.classList.add('btn-primary');
btnNext.id = 'btnNext';
btnNext.innerText = 'NEXT'

var btnPrevious = document.createElement('button');
btnPrevious.classList.add('btn');
btnPrevious.classList.add('btn-primary');
btnPrevious.id = 'btnPrevious';
btnPrevious.innerText = 'PREVIOUS'

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
      console.log(this.responseText);
    }
    if(this.status == 400){
      console.log(this.responseText);
    }
  };
}

var listMovies = function(data){
    clearResults();
    var container = document.getElementById('container');
    var list = document.createElement('ul');
    list.classList.add('list-group');
    var listElement = document.createElement('li');
    listElement.classList.add('list-group-item');
    listElement.id = 'results';
    var gridContainer = document.createElement('div');
    gridContainer.id = 'grid';
    gridContainer.classList.add('container-fluid');
    //Listing Movies
    //****************************************************************** 
    var movieRow = document.createElement('div');
    movieRow.id = 'rowResult';
    movieRow.classList.add('row');
    var colIdx = 0;
    for(var idx = 0; idx < data.results.length; ++idx){

        if(colIdx == 3){
            gridContainer.appendChild(movieRow);
            colIdx = 0;
            var movieRow = document.createElement('div');
            movieRow.id = 'rowResult';
            movieRow.classList.add('row');
        }
        
        var movieContainer = document.createElement('div');
        movieContainer.setAttribute('class', 'col-md-4');
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
        vote_avg.innerHTML = data.results[idx].vote_average + ' Stars';

        // saveToCache(data.results[idx]); //Saving to local database

        movieContainer.appendChild(title);
        movieContainer.appendChild(release_date);
        movieContainer.appendChild(poster);
        movieContainer.appendChild(vote_avg);

        movieRow.appendChild(movieContainer);
        colIdx++;
    }
    listElement.appendChild(gridContainer);
    list.appendChild(listElement);
    //****************************************************************** 
    
    //Paging
    //******************************************************************
    var lePaging = document.createElement('li');
    lePaging.classList.add('list-group-item');
    lePaging.id = 'paging';

    resultPages = data.total_pages;

    if(currentPage == resultPages){
        btnNext.style.display = 'none';
    }
    else if(currentPage == 1){
        btnPrevious.style.display = 'none';
    }
    else {
        btnNext.style.display = 'inline';
        btnPrevious.style.display = 'inline';
    }

    lePaging.appendChild(btnPrevious);
    lePaging.appendChild(btnNext);

    list.appendChild(lePaging);

    //******************************************************************
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
    
    currentSearch = name.value;
    
    findMovie(currentSearch, currentPage);
    name.value = '';
};


btnNext.onclick = function(evt){
    if((currentPage + 1) <= resultPages)
        currentPage += 1;
    
    findMovie(currentSearch, currentPage);
};


btnPrevious.onclick = function(evt){
    if((currentPage - 1) > 0)
        currentPage -= 1;
    
    findMovie(currentSearch, currentPage);
};

var clearResults = function(){
    var container = document.getElementById('container');
    container.innerHTML = ' ';
};
