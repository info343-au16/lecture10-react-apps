import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//TMDB constants (https://developers.themoviedb.org/3/getting-started)
var apiKey = "d37398a8fa01ed9f121f9074b614e320";
var baseApiUrl = "https://api.themoviedb.org/3";
var baseImageUrl = "https://image.tmdb.org/t/p/w92"; //small posters

var controller = {

  //download data from the url
  search: function(searchQuery) {    
    //construct URL
    var resource = '/search/movie';
    var uri = baseApiUrl + resource + '?query='+searchQuery+'&api_key='+apiKey;
    console.log("fetching", uri);

    fetch(uri) //download the data
      .then(function(res) { return res.json(); })
      .then(function(data) {
        //re-render with new data (pass in as a prop)
        ReactDOM.render(<App data={data} />, document.querySelector('#root'));
      });
  },

  getPosterUrl: function(movie){
    if(movie.poster_path) {
      return baseImageUrl + movie.poster_path;
    }
    else {
      return ''; //don't load bad image'
    }
  }

};

export default controller; //export object