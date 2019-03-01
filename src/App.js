import React, { Component } from "react";
import Book from "./components/book.js";
import "./css/App.css";
import "./css/loader.css";
import axios from "axios";
import { api_url } from "./config.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      books: [],
      searchIndex: 0,
      error: false,
      hasMore: true,
      isLoading: false
    };

    window.onscroll = () => {
      const {
        loadUsers,
        state: { error, isLoading, hasMore }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.performSearch();
      }
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
        )}&startIndex=${this.state.searchIndex}`
      )
      .then(res => {
        const books = res.data.items;
        let newIndex = this.state.searchIndex;
        newIndex += 10;
        this.setState({
          books: [...this.state.books, ...books],
          searchIndex: newIndex
        });
      });
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
        <div class="lds-roller">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default App;
