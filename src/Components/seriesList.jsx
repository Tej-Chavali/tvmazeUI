import React, { Component } from "react";
import { getSeries } from "../services/seriesService";
import SeriesCard from "./seriesCardView";
import noImage from "../no-img.png";
import Search from "./search";

class SeriesList extends Component {
  state = {
    series: [],
    searchText: "",
  };

  async componentDidMount() {
    let searchValue = this.getSearchString();

    const { data } = await getSeries(searchValue);
    this.setState({ series: data });
    this.setState({ searchText: searchValue });
  }

  async componentDidUpdate() {
    let searchValue = this.getSearchString();

    const { data } = await getSeries(searchValue);
    this.setState({ series: data });
  }

  getSearchString() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let searchValue = params.get("q");
    return searchValue;
  }

  render() {
    const seriesList = this.state.series;
    return (
      <React.Fragment>
        <Search style={{ paddingBottom: "10px", alignContent: "center" }} />
        {seriesList.length ? (
          seriesList.map((series) => {
            return (
              <SeriesCard
                style={{ paddingTop: "25px" }}
                series={{
                  id: series.show.id,
                  title: series.show.name,
                  summary: series.show.summary,
                  image: series.show.image ? series.show.image.medium : noImage,
                  searchText: this.state.searchText,
                }}
              />
            );
          })
        ) : (
          <h3 style={{ paddingTop: "25px" }}>No data available</h3>
        )}
      </React.Fragment>
    );
  }
}

export default SeriesList;
