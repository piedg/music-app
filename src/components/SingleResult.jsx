import styles from "../style/SingleResult.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unHeart } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleResult = ({
  title,
  artist,
  artistId,
  thumbnailMedium,
  thumbnailSmall,
  duration,
  isLiked,
  playTrack,
  trackPreview,
  trackId,
  trackData
}) => {
  const isPlayed = useSelector((state) => state.tracksPlayerReducer.isPlayed);
  const currentTrackId = useSelector(
    (state) => state.tracksPlayerReducer.trackId
  );

  const secToMins = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  };

  const mDuration = secToMins(duration)

  return (
    <div className={styles.singleResultContainer}>
      <div className={styles.singleResultImgContainer}>
        <img
          className={styles.singleResultBGImg}
          src={thumbnailMedium}
          alt="Img"
        />
      </div>

      <div className={styles.singleResultInfoContainer}>
        <Link
          className={styles.singleResultLink}
          to={{
            pathname: `/track/${trackId}`,
            state: { title, artist, artistId, duration, thumbnailMedium, trackId, trackPreview },
          }}
        >
          <div className={styles.singleResultInfo}>
            <h3>{title}</h3>
            <h4>{artist}</h4>
            <h4>{mDuration}</h4>
          </div>
        </Link>
      </div>
      <div className={styles.singleResultBottom}>
        {isPlayed && trackId === currentTrackId ? (
          <FontAwesomeIcon
            className={styles.singleResultBtn}
            size="2x"
            icon={faPause}
            onClick={() => playTrack(trackId, trackPreview, trackData)}
          />
        ) : (
          <FontAwesomeIcon
            className={styles.singleResultBtn}
            size="2x"
            icon={faPlay}
            onClick={() => playTrack(trackId, trackPreview, trackData)}
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
  );
};

export default SingleResult;
