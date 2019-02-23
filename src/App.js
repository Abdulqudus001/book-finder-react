import React, { Component } from "react";
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
          <input type="text" name="" id="" onChange={this.handleSearchChange} />
          <button>Search</button>
        </div>
      </div>
    );
  }
}

export default App;
