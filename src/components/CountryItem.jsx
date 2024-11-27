import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

CountryItem.propTypes = {
  country: PropTypes.object.isRequired,
};

function CountryItem({ country }) {
  const { countryName, emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
