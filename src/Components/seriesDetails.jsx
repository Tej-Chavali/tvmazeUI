import React, { Component } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import {
  getSpecificSeries,
  getSeasonDetails,
  getEpisodes,
} from "../services/seriesService";
import { Link } from "react-router-dom";
import "./seriesDetails.css";
import noImage from "../no-img.png";
import ReactHtmlParser from "react-html-parser";

class SeriesDetails extends Component {
  state = {
    showInfo: {},
    seasonsInfo: [],
    seasonSelected: "",
    episodesInfo: [],
  };

  async componentDidMount() {
    const showId = this.props.match.params.id;
    const { data } = await getSpecificSeries(showId);
    this.setState({
      showInfo: {
        id: data.id,
        title: data.name,
        summary: data.summary,
        image: data.image.medium,
      },
    });

    const { data: seasons } = await getSeasonDetails(showId);
    this.setState({ seasonsInfo: seasons });
    this.setState({ seasonSelected: seasons[0].id.toString() });

    const { data: episodes } = await getEpisodes(this.state.seasonSelected);
    this.setState({ episodesInfo: episodes });
  }

  handleClick = async ({ currentTarget: input }) => {
    const seasonSelected = this.state.seasonSelected;
    if (input.value !== seasonSelected) {
      const { data: episodes } = await getEpisodes(input.value);
      this.setState({ episodesInfo: episodes });
      this.setState({ seasonSelected: input.value });
    }
  };

  render() {
    const { showInfo, seasonsInfo, episodesInfo } = this.state;
    let showImage = showInfo.image ? showInfo.image : noImage;
    return (
      <div>
        <Container className="themed-container" fluid={true}>
          <Link to="/">
            <Button style={{ float: "left" }}>Back</Button>
          </Link>

          <Row style={{ paddingTop: 15 }}>
            <CardTitle tag="h5">{showInfo.title}</CardTitle>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <CardText>{ReactHtmlParser(showInfo.summary)}</CardText>
          </Row>

          <Row style={{ paddingTop: 10 }}>
            <Col xs="5">
              <img width="100%" src={showImage} />
            </Col>
            <Col xs="7">
              <Row>
                <select
                  class="form-control"
                  style={{ alignContent: "right" }}
                  id="exampleFormControlSelect1"
                  value={this.state.seasonSelected.id}
                  options={this.state.seasonSelected}
                  onChange={this.handleClick}
                >
                  {seasonsInfo.map((season) => (
                    <option key={season.id} value={season.id}>
                      Season {season.number}
                    </option>
                  ))}
                </select>
              </Row>
              <Row>
                <Table
                  dark
                  style={{ padding: "0.25rem", display: "inline-table" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "40%", textAlign: "center" }}>
                        Episode
                      </th>
                      <th style={{ width: "20%", textAlign: "center" }}>
                        Duration
                      </th>
                      <th style={{ width: "80%", textAlign: "center" }}>
                        Airdate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {episodesInfo.map((episode) => (
                      <tr key={episode.id}>
                        <td style={{ width: "40%", textAlign: "center" }}>
                          Episode {episode.number}
                        </td>
                        <td style={{ width: "20%", textAlign: "center" }}>
                          {episode.runtime}
                        </td>
                        <td style={{ width: "80%", textAlign: "center" }}>
                          {episode.airdate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SeriesDetails;
