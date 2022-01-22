import * as actionTypes from "../actions/handleTracksData";

const initialState = {
  tracksData: [],
  loading: false,
  error: [],
  artistTracks: []
};

const tracksDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TRACKS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_TRACKS_SUCCESS:
      return {
        ...state,
        tracksData: action.tracksData,
        loading: false,
      };
    case actionTypes.FETCH_TRACKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.FETCH_TRACKS_BY_ARTIST_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_TRACKS_BY_ARTIST_SUCCESS:
      return {
        ...state,
        artistTracks: action.artistTracks,
        loading: false,
      };
    case actionTypes.FETCH_TRACKS_BY_ARTIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default tracksDataReducer;
