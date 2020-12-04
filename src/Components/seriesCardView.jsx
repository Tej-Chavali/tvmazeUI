import React, { Component } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

class SeriesCard extends Component {
  state = {};
  render() {
    const series = this.props.series;
    return (
      <div>
        <Card>
          <Container>
            <Row>
              <Col sm="6">
                <Card.Img
                  width="100%"
                  src={series.image}
                  alt="Card image cap"
                />
              </Col>
              <Col sm="6">
                <Card.Body style={{ width: "24rem", padding: "0.25rem" }}>
                  <Card.Title>{series.title}</Card.Title>
                  <Card.Text>{ReactHtmlParser(series.summary)}</Card.Text>
                  <Link
                    to={`/series/${series.id}/episodes`}
                    params={{ searchText: this.props.searchText }}
                  >
                    {" "}
                    <Button>Show Episodes</Button>{" "}
                  </Link>
                </Card.Body>{" "}
              </Col>{" "}
            </Row>
          </Container>
        </Card>
      </div>
    );
  }
}

export default SeriesCard;
