export const PLAY_TRACK_PREVIEW_START = "PLAY_TRACK_PREVIEW_START";
export const PLAY_TRACK_PREVIEW_SUCCESS = "PLAY_TRACK_PREVIEW_SUCCESS";
export const PLAY_TRACK_PREVIEW_FAIL = "PLAY_TRACK_PREVIEW_FAIL";
export const PAUSE_TRACK = "PAUSE_TRACK";
export const PLAY_TRACK = "PLAY_TRACK";

export const playTrackPreview = (id, url) => {
  return async (dispatch) => {
    dispatch(playTrackPreviewStart());
    try {
      dispatch(playTrackPreviewSuccess(id, url));
    } catch (error) {
      console.log(error);
      dispatch(playTrackPreviewFail());
    }
  };
};

export const playTrackPreviewStart = () => {
  return {
    type: PLAY_TRACK_PREVIEW_START,
  };
};

export const playTrackPreviewSuccess = (id, url) => {
  return {
    type: PLAY_TRACK_PREVIEW_SUCCESS,
    trackPreview: url,
    trackId: id,
    isPlayed: true,
    trackPlayLoading: false,
    trackPlayError: false,
  };
};

export const playTrackPreviewFail = (error) => {
  return {
    type: PLAY_TRACK_PREVIEW_FAIL,
    trackPlayError: error,
    error,
  };
};

export const pauseTrackPreviewSuccess = () => {
    console.log("pausa")
  return {
    type: PAUSE_TRACK,
    isPlayed: false
  };
};

export const rePlayTrackPreview = () => {
  return {
    type: PLAY_TRACK,
  };
};
