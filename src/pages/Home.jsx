import styles from "../style/Home.module.css";
import { useState } from "react";
import SearchResults from "../components/SearchResults";
import { fetchTracksData } from "../store/actions/handleTracksData";
import {
  playTrackPreview,
  pauseTrackPreviewSuccess,
} from "../store/actions/handleTracksPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";

export const Home = () => {
  const [inputText, setInputText] = useState("");

  const tracksData = useSelector((state) => state.tracksDataReducer.tracksData);
  const loading = useSelector((state) => state.tracksDataReducer.loading);
  const error = useSelector((state) => state.tracksDataReducer.error);
  const isPlayed = useSelector((state) => state.tracksPlayerReducer.isPlayed);

  const dispatch = useDispatch();

  const fetchResultsData = (e) => {
    e.preventDefault();
    if (inputText === "") {
      return null;
    }
    dispatch(fetchTracksData(inputText.trim()));
    setInputText("");
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };

  /* const addLike = () => {

  }
*/

  const pauseTrack = () => {
    dispatch(pauseTrackPreviewSuccess());
  };

  const playTrack = (id, url) => {
    if (isPlayed) {
      pauseTrack();
    } else {
      dispatch(playTrackPreview(id, url));
    }
  };

  const showResults = () => {
    if (tracksData.error) {
      return <h1>Errore. Provare con una nuova ricerca</h1>;
    } else if (tracksData.length <= 0) {
      return <h1>Ascolta i tuoi brani preferiti in un click</h1>;
    } else if (tracksData.total === 0 || tracksData.total === undefined) {
      return <h1>Nessun risultato</h1>;
    } else {
      return loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Risultati</h1>
          <SearchResults
            trackData={tracksData}
            error={error}
            loading={loading}
            playTrack={playTrack}
          />
        </>
      );
    }
  };
  return (
    <div className={styles.mainContainer}>
      <form onSubmit={fetchResultsData} className={styles.searchBarContainer}>
        <input
          onChange={handleSearchInput}
          className={styles.searchBarInput}
          value={inputText}
          type="text"
        />
        <button onClick={fetchResultsData} className={styles.searchBarButton}>
          <FontAwesomeIcon size="2x" icon={faSearch} />
        </button>
      </form>
      <div className={styles.resultsContainer}>{showResults()}</div>
      <div className={styles.musicPlayer}></div>
    </div>
  );
};
