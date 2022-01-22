import * as actionTypes from "../actions/handleTracksPlayer";

const initialState = {
  trackPreview: "",
  trackId: "",
  isPlayed: false,
  trackPlayLoading: false,
  trackPlayError: false,
};

const tracksPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_TRACK_PREVIEW_START:
      return {
        ...state,
        trackPlayLoading: true,
      };
    case actionTypes.PLAY_TRACK_PREVIEW_SUCCESS:
      return {
        ...state,
        trackPlayLoading: false,
        trackPreview: action.trackPreview,
        trackId: action.trackId,
        isPlayed: true
      };
    case actionTypes.PLAY_TRACK_PREVIEW_FAIL:
      return {
        ...state,
        trackPlayLoading: false,
        trackPlayError: false,
      };

    case actionTypes.PAUSE_TRACK:
      return {
        ...state,
        isPlayed: false,
      };

    case actionTypes.PLAY_TRACK:
      return {
        ...state,
        isPlayed: true,
      };

    default:
      return state;
  }
};

export default tracksPlayerReducer;
