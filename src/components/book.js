import React, { Component } from "react";
import "../css/book.css";

export default class book extends Component {
  render() {
    return (
      <div className="book">
        <div className="book-image" />
        <div className="about">
          <p className="name">{this.props.name}</p>
          <p className="by">By: {this.props.author}</p>
          <p className="pub-by">Published by: {this.props.published}</p>
          <a href="#">See this book</a>
        </div>
      </div>
    );
  }
}
