import axios from "axios";
import { deezerKey } from "../../keys/deezer" ;

export const FETCH_TRACKS_START = "FETCH_TRACKS_START";
export const FETCH_TRACKS_SUCCESS = "FETCH_TRACKS_SUCCESS";
export const FETCH_TRACKS_FAIL = "FETCH_TRACKS_FAIL";

export const FETCH_TRACKS_BY_ARTIST_START = "FETCH_TRACKS_BY_ARTIST_START";
export const FETCH_TRACKS_BY_ARTIST_SUCCESS = "FETCH_TRACKS_BY_ARTIST_SUCCESS";
export const FETCH_TRACKS_BY_ARTIST_FAIL = "FETCH_TRACKS_BY_ARTIST_FAIL";

export const fetchTracksData = (inputText) => {
  if (inputText.trim() === "") {
    return;
  }
  return async (dispatch) => {
    console.log("sono dentro handleTracksData", inputText);
    dispatch(fetchTracksStart());

    const options = {
      method: "GET",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search",
      params: { q: `${inputText}` },
      headers: {
        "x-rapidapi-key": deezerKey,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        dispatch(fetchTracksSuccess(response.data));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(fetchTracksFail(error));
      });
  };
};

export const fetchTracksStart = () => {
  return {
    type: FETCH_TRACKS_START,
  };
};

export const fetchTracksSuccess = (tracksData) => {
  return {
    type: FETCH_TRACKS_SUCCESS,
    tracksData,
  };
};

export const fetchTracksFail = (error) => {
  return {
    type: FETCH_TRACKS_FAIL,
    error,
  };
};

export const fetchTracksByArtist = (artist) => {
  console.log("sono dentro handleTracksArtist", artist);
  
  return async (dispatch) => {
    dispatch(fetchTracksByArtistStart());

    console.log("sono dentro handleTracksArtist 3333", artist);

    const options = {
      method: "GET",
      url: `https://deezerdevs-deezer.p.rapidapi.com/search`,
      params: { q: `${artist}` },
      headers: {
        "x-rapidapi-key": deezerKey,
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        dispatch(fetchTracksByArtistSuccess(response.data));
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        dispatch(fetchTracksByArtistFail(error));
      });
  };
};

export const fetchTracksByArtistStart = () => {
  return {
    type: FETCH_TRACKS_BY_ARTIST_START,
  };
};

export const fetchTracksByArtistSuccess = (artistTracks) => {
  return {
    type: FETCH_TRACKS_BY_ARTIST_SUCCESS,
    artistTracks,
  };
};

export const fetchTracksByArtistFail = (error) => {
  return {
    type: FETCH_TRACKS_BY_ARTIST_FAIL,
    error,
  };
};
