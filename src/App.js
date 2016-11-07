import React from 'react';
import {Form, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';

import MovieController from './MovieController';

var SAMPLE_MOVIES = [
  {
    title: "Star Wars: The Force Awakens", 
    release_date: "2015-12-15", 
    poster_url: "https://image.tmdb.org/t/p/w92/weUSwMdQIa3NaXVzwUoIIcAi85d.jpg"
  },
  {title: "Zootopia", release_date: "2016-02-11", poster_url: "https://image.tmdb.org/t/p/w92/sM33SANp9z6rXW8Itn7NnG1GOEs.jpg"},
  {title: "Inception", release_date: "2010-07-14", poster_url: "https://image.tmdb.org/t/p/w92/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"}
];

//overall App
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>Movie Search</h1>
        </header>
        <main>
          <SearchForm />
          <MovieTable movies={this.props.data.results} />
        </main>
      </div>
    );
  }
}

//table of movie data
class MovieTable extends React.Component {
  render() {

    //can interact with this.props here
    var rows = this.props.movies.map(function(movieObj){
      return <MovieRow movie={movieObj} />;
      //new MovieRow(movieObj);
    });

    return (
      <table className="table table-condensed">
        <thead>
          <tr><th className="col-xs-1">Poster</th><th className="col-xs-4">Title</th><th>Released</th></tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>      
    );
  }
}

class MovieRow extends React.Component {
  render() {

    var posterUrl = MovieController.getPosterUrl(this.props.movie);

    return (
      <tr>
        <td><img className="poster-lg" src={posterUrl} alt="poster for movie title"/></td>
        <td>{this.props.movie.title}</td>
        <td>{this.props.movie.release_date}</td>
      </tr>
    );
  }
}

class SearchForm extends React.Component {

  handleClick() {
    console.log("You clicked me!");
  }

  render() {
    return (
      <Form inline>
        <InputGroup>
          <InputGroup.Button>
            <Button onClick={this.handleClick}>
              <Glyphicon glyph="search" aria-label="Search"/>
            </Button>
          </InputGroup.Button>
          <FormControl type="text" placeholder="Search..." />
          <InputGroup.Addon> {0} results </InputGroup.Addon>
        </InputGroup>
      </Form>
    );
  }
}
export default App;
