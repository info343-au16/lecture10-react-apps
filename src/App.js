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
  constructor(props) {
    super(props);

    this.state = {movies: [], totalResults: 0 };
    this.fetchData = this.fetchData.bind(this);
  }

  //helper method
  fetchData(searchTerm) {
    var thisComponent = this; //1. save "this" for later
    MovieController.search(searchTerm)
      .then(function(data) { //once we get data
        thisComponent.setState({
          movies:data.results, 
          totalResults:data.total_results
        })
      });
  }  

  render() {
    return (
      <div className="container">
        <header>
          <h1>Movie Search</h1>
        </header>
        <main>
          <SearchForm totalResults={this.state.totalResults} searchCallback={this.fetchData}/>
          <MovieTable movies={this.state.movies} />
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

  constructor(props) {
    super(props);

    this.state = {clickCount: 0, searchValue: ''}
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    console.log("You clicked me!");

    this.props.searchCallback(this.state.searchValue);
    // var newCount = this.state.clickCount+1;
    // this.setState({clickCount: newCount });
  }

  handleChange(event) {
    var newValue = event.target.value;
    console.log("has typed", newValue);
    this.setState({searchValue: newValue});
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
          <FormControl type="text" placeholder="Search..." onChange={this.handleChange}/>
          <InputGroup.Addon> {this.props.totalResults} results </InputGroup.Addon>
        </InputGroup>
      </Form>
    );
  }
}
export default App;
