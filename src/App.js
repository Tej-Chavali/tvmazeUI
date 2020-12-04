import React, { Component } from "react";
import Search from "./Components/search";
import SeriesList from "./Components/seriesList";
import SeriesDetails from "./Components/seriesDetails";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App" style={{ width: "100%" }}>
          <Route path="/search" component={SeriesList} />
          <Route path="/series/:id/episodes" component={SeriesDetails} />
          <Route exact path="/" component={Search} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
