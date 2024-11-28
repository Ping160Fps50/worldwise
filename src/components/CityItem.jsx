import styles from "./CityItem.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useCities } from "../hooks/useCities";

CityItem.propTypes = {
  city: PropTypes.object.isRequired,
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCities();
  const {
    cityName,
    emoji,
    date,
    id,
    position: { lat, lng },
  } = city;
  return (
    <li>
      <NavLink
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </NavLink>
    </li>
  );
}

export default CityItem;
