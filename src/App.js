import React, { Component } from "react";
import Book from "./components/book.js";
import "./css/App.css";
import axios from "axios";
import { api_url } from "./config.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      books: []
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  performSearch() {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          this.state.searchValue
        )}`
      )
      .then(res => {
        const books = res.data;
        console.log(books.items);
        this.setState({
          books: books.items
        });
        console.log(this.state.books);
      });
    // fetch('').then(respponse => {return response.json();}).then(data => console.log(data))
  }
  render() {
    return (
      <div className="App">
        <div className="search">
          <input
            type="text"
            placeholder="Find a book"
            name=""
            id=""
            onChange={this.handleSearchChange}
          />{" "}
          <button onClick={this.performSearch}> Search </button>{" "}
        </div>{" "}
        <div className="books">
          {this.state.books.map(element => {
            return (
              <Book
                name={element.volumeInfo.title}
                author={element.volumeInfo.authors}
                image={
                  element.volumeInfo.imageLinks
                    ? element.volumeInfo.imageLinks.thumbnail
                    : ""
                }
                published={element.volumeInfo.publisher}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
