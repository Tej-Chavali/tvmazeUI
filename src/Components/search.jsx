import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./search.css";

class Search extends Component {
  state = {
    searchValue: "",
  };

  handleOnChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs="9">
            <input
              name="text"
              type="text"
              placeholder="Search"
              onChange={(event) => this.handleOnChange(event)}
              value={this.state.searchValue}
            />
          </Col>
          <Col xs="3">
            <Link to={`/search?q=${this.state.searchValue}`}>
              <button style={{ width: "100%", paddingTop: "20px" }}>
                Search
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
