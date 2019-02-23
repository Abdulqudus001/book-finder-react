import React, { Component } from "react";
import Book from "./components/book.js";
import "./css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
    let array = [1, 2, 3, 4, 5, 6];
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
        <div className="books">
          <Book name="Abdulqudus" author="Abubakre" published="me" />
        </div>
      </div>
    );
  }
}

export default App;
