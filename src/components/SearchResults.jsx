import styles from "../style/SearchResults.module.css";
import SingleResult from "./SingleResult";

const SearchResults = ({ trackData, playTrack, pauseTrack }) => {
  const myData = trackData.data;
  const renderElement = () => {
    return myData?.map((track, index) => {
      if (index < 12) {
        return (
          <SingleResult
            key={track.id}
            title={track.title}
            artist={track.artist.name}
            artistId={track.artist.id}
            thumbnailSmall={track.album.cover_small}
            thumbnailMedium={track.album.cover_medium}
            duration={track.duration}
            playTrack={playTrack}
            trackId={track.id}
            trackPreview={track.preview}
          />
        );
      } else {
        return null;
      }
    });
  };

  return <div className={styles.resultsContainer}>{renderElement()}</div>;
};

export default SearchResults;
