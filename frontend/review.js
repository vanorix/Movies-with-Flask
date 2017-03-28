var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:5000/reviews/review";

var post = function (oData) {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", url, true);
  //xmlhttp.setRequestHeader("Content-Type", "multipart/form-data");
  xmlhttp.send(oData);
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));
    }
  };
}

function cleanForm(){
  var title = document.getElementById('title');
  var name = document.getElementById('username');
  var review = document.getElementById('review');
  var rating = document.getElementById('rating');
}

var form = document.getElementById('upload');
form.onsubmit = function(evt) {
  evt.preventDefault();
  var data = new FormData();
  var title = document.getElementById('title');
  var name = document.getElementById('username');
  var review = document.getElementById('review');
  var rating = document.getElementById('rating');
  
  data.append('movie_name', title.value);
  data.append('user', name.value);
  data.append('description', review.value);
  data.append('rating', rating.value);
  
  //post(data);
  location.reload();
};