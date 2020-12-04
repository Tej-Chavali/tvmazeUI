import axios from "axios";

export function getSeries(queryParam) {
  let url = "http://api.tvmaze.com/search/shows?q=";
  url = queryParam ? url + queryParam : url;
  return axios.get(url);
}

export function getSpecificSeries(seriesId) {
  return axios.get(`http://api.tvmaze.com/shows/${seriesId}`);
}

export function getSeasonDetails(seriesId) {
  return axios.get(`http://api.tvmaze.com/shows/${seriesId}/seasons`);
}

export function getEpisodes(seasonId) {
  return axios.get(`http://api.tvmaze.com/seasons/${seasonId}/episodes`);
}
