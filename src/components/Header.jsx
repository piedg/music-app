import styles from "../style/Header.module.css";
import { Link } from "react-router-dom";

export const Header = (isLogged) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLogo}>
        <Link to="/"> Home </Link>
      </div>
      <div className={styles.rightContainer}>
       {/* <p>Brani salvati</p>
        <p>{isLogged ? "Login" : "Logout}"}</p>
       <p>Impostazioni</p> */}
      </div>
    </div>
  );
};
