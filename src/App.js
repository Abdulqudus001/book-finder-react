import React, { Component } from "react";
import Book from "./book.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      searchValue: event.target.value
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
          />
          <button>Search</button>
        </div>
        <Book />
      </div>
    );
  }
}

export default App;
