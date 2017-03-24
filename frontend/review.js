var xmlhttp = new XMLHttpRequest();
var url = "http://localhost:5000/review";

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

var form = document.getElementById('upload');
form.onsubmit = function(evt) {
  evt.preventDefault();
  var data = new FormData();
  var name = document.getElementById('name');
  var review = document.getElementById('review');
  data.append('name', name.value);
  data.append('review', review.value);
  
  post(data);
};