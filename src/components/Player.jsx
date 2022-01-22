import styles from "../style/Player.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import {
  rePlayTrackPreview,
  pauseTrackPreviewSuccess,
} from "../store/actions/handleTracksPlayer";

export const Player = () => {
  const trackPreview = useSelector(
    (state) => state.tracksPlayerReducer.trackPreview
  );
  const isPlayed = useSelector((state) => state.tracksPlayerReducer.isPlayed);
  const trackId = useSelector((state) => state.tracksPlayerReducer.trackId);

  // creare setState per isPlayed
  // qui

  const trackTitle = useSelector(
    (state) => state.tracksPlayerReducer.trackTitle
  );

  const audio = trackPreview;
  const dispatch = useDispatch();
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    updateSong(audio);
    // eslint-disable-next-line
  }, [audio]);

  const audioRef = useRef();

  const updateSong = () => {
    if (audioRef.current) {
      if (!isPlayed) {
        audioRef.current.pause();
      } else if (isPlayed) {
        audioRef.current.load();
        audioRef.current.play().catch((error) => {
          //  when an exception is played, the exception flow is followed
        });
      }
    }
  };

  const handleVolume = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(audioRef.current.volume);
  };

  //Riportare questa funzione nelle card in homepage e nella TrackPage
  const PlayPause = () => {
    if (isPlayed) {
      dispatch(pauseTrackPreviewSuccess());
      console.log("TrackPausa", isPlayed);
      audioRef.current.pause();
    } else if (!isPlayed) {
      dispatch(rePlayTrackPreview());
      audioRef.current.play().catch((error) => {
        console.log(error);
      });
    }
  };

  const renderPlayer = () => {
    return (
      <div className={styles.playerContainer}>
        <audio ref={audioRef}>
          <source src={audio} type="audio/mpeg" />
        </audio>
        <button
          className={styles.playerButton}
          onClick={PlayPause}
          disabled={!trackId}
        >
          {isPlayed ? (
            <FontAwesomeIcon size="2x" icon={faPause} />
          ) : (
            <FontAwesomeIcon size="2x" icon={faPlay} />
          )}
        </button>
        <div>{trackTitle}</div>
        <div className={styles.volumeContainer}>
          <input
            className={styles.volumeControl}
            type="range"
            onChange={handleVolume}
            min={0.0}
            max={1.0}
            step={0.01}
            value={volume}
          />
        </div>
      </div>
    );
  };

  /*    audioElement.currentTime;
  audioElement.ended;
  audioElement.duration; */

  return <div>{renderPlayer()}</div>;
};
