import React, { Component } from "react";
import Book from "./components/book.js";
import "./css/App.css";
import "./css/loader.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      books: [],
      searchIndex: 0,
      isLoading: false,
      hasMore: true,
      error: false
    };

    window.onscroll = () => {
      const {
        state: { isLoading, hasMore, error }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (isLoading || !hasMore || error) return;

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
    this.checkKey = this.checkKey.bind(this);
    this.newSearch = this.newSearch.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }
  newSearch() {
    this.setState({
      books: []
    });
    this.performSearch();
  }
  checkKey(e) {
    // eslint-disable-next-line
    if (e.charCode != 13) return;
    this.setState({
      books: []
    });
    this.performSearch();
  }
  performSearch() {
    this.setState({
      isLoading: true
    });
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          this.state.searchValue
        )}&startIndex=${this.state.searchIndex}`
      )
      .then(res => {
        const books = res.data.items;
        if (this.state.searchIndex >= Math.round(res.data.totalItems)) {
          this.setState({
            hasMore: false
          });
        }
        let newIndex = this.state.searchIndex;
        newIndex += 10;
        this.setState({
          isLoading: false,
          books: [...this.state.books, ...books],
          searchIndex: newIndex
        });
      })
      .catch(err => {
        this.setState({
          error: true
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
            onKeyPress={this.checkKey}
            onChange={this.handleSearchChange}
          />{" "}
          <button onClick={this.newSearch}> Search </button>{" "}
        </div>{" "}
        <div className="books">
          {" "}
          {this.state.books.map((element, index) => {
            return (
              <Book
                key={index}
                name={element.volumeInfo.title}
                author={element.volumeInfo.authors}
                image={
                  element.volumeInfo.imageLinks
                    ? element.volumeInfo.imageLinks.thumbnail
                    : ""
                }
                published={element.volumeInfo.publisher}
                to={element.volumeInfo.previewLink}
              />
            );
          })}{" "}
        </div>{" "}
        {this.state.isLoading && !this.state.error && (
          <div className="loader">
            <div className="lds-roller">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>{" "}
          </div>
        )}{" "}
      </div>
    );
  }
}

export default App;
