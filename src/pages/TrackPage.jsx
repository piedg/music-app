import { useState, useEffect } from "react";
import styles from "../style/TrackPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  playTrackPreview,
  pauseTrackPreviewSuccess,
} from "../store/actions/handleTracksPlayer";
//import { fetchTracksByArtist } from "../store/actions/handleTracksData";
import axios from "axios";
import { Link } from "react-router-dom";

export const TrackPage = (props) => {
  const { title, artist, duration, thumbnailMedium, trackId, trackPreview } =
    props.location.state;

  const isLiked = false;
  const isPlayed = useSelector((state) => state.tracksPlayerReducer.isPlayed);
  const currentTrackId = useSelector(
    (state) => state.tracksPlayerReducer.trackId
  );

  const secToMins = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  const _duration = secToMins(duration);

  const dispatch = useDispatch();

  const pauseTrack = () => {
    dispatch(pauseTrackPreviewSuccess());
  };
  const playTrack = (id, url) => {
    if (isPlayed) {
      dispatch(pauseTrackPreviewSuccess());
    } else {
      dispatch(playTrackPreview(id, url));
    }
  };

  useEffect(() => {
    renderTrackByArtist(artist);

    // eslint-disable-next-line
  }, [artist]);

  const [tracksArtist, setTracksArtist] = useState([]);

  const renderTrackByArtist = async (artist) => {
    const options = {
      method: "GET",
      url: `https://deezerdevs-deezer.p.rapidapi.com/search`,
      params: { q: `${artist}` },
      headers: {
        "x-rapidapi-key": "210bad9669mshfbd1df1e66db7b2p12a274jsnd537df79dec7",
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      },
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);

        setTracksArtist(response.data.data);
        renderTracks();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 
  const renderTracks = () => {
    return tracksArtist?.map((track, index) => {
      if (index < 5) {
        return (
          <div key={index} className={styles.trackArtistContainer}>
            <Link
              to={{
                pathname: `/track/${trackId}`,
                state: {
                  title: track.title,
                  artist: track.artist.name,
                  artistId: track.artist.id,
                  duration: track.duration,
                  thumbnailMedium: track.album.cover_medium,
                  trackId: track.id,
                  trackPreview: track.preview,
                },
              }}
            >
              <img src={track.album.cover_medium} alt="" />
              <div className={styles.trackArtistTitle}>
                <h4>{track.title}</h4>
              </div>
            </Link>
          </div>
        );
      } else {
        return null;
      }
    });
  }; 

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <h1>{title}</h1>
          <h2>{artist}</h2>
          <h3>durata {_duration}</h3>
          <div className={styles.bottomContainer}>
            {isPlayed && trackId === currentTrackId ? (
              <FontAwesomeIcon
                className={styles.singleResultBtn}
                size="2x"
                icon={faPause}
                onClick={() => pauseTrack()}
              />
            ) : (
              <FontAwesomeIcon
                className={styles.singleResultBtn}
                size="2x"
                icon={faPlay}
                onClick={() => playTrack(trackId, trackPreview)}
              />
            )}
            {isLiked ? (
              <FontAwesomeIcon
                size="2x"
                icon={faHeart}
                className={styles.singleResultBtn}
              />
            ) : (
              <FontAwesomeIcon
                size="2x"
                icon={unHeart}
                className={styles.singleResultBtn}
              />
            )}
          </div>
        </div>

        <div className={styles.rightContainer}>
          <img src={thumbnailMedium} alt="Thumbnail" />
        </div>
      </div>
      <h1 style={{ marginLeft: "20px" }}>Dallo stesso artista:</h1>
      <div className={styles.renderArtistTrackContainer}>{tracksArtist ? renderTracks() : <h1>Continua ad ascoltare la musica che più ti piace \m/</h1>}</div>
    </div>
  );
};
