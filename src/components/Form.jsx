import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import { useUrlPosition } from "../hooks/useUrlPosition";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Spinner from "./Spinner";
import Message from "./Message";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
const initialState = {
  cityName: "",
  country: "",
  date: new Date(),
  notes: "",
  emoji: "",
  isLoadingGeoLocation: false,
  geoCodingError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cityName":
      return { ...state, cityName: action.payload };
    case "country":
      return { ...state, country: action.payload };
    case "emoji":
      return { ...state, emoji: convertToEmoji(action.payload) };
    case "date":
      return { ...state, date: action.payload };
    case "notes":
      return { ...state, notes: action.payload };
    case "loading":
      return { ...state, isLoadingGeoLocation: action.payload };
    case "error":
      return { ...state, geoCodingError: action.payload };
    default:
      throw new Error("invalid action");
  }
}

function Form() {
  const navigate = useNavigate();
  const { onAddCity } = useCities();
  const [lat, lng] = useUrlPosition();
  const [
    {
      cityName,
      country,
      emoji,
      date,
      notes,
      isLoadingGeoLocation,
      geoCodingError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchCity = async () => {
      try {
        dispatch({ type: "loading", payload: true });
        dispatch({ type: "error", payload: "" });
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.ok) throw new Error("No Fetching");
        const data = await res.json();
        if (!data.countryCode)
          throw new Error("That doesnt seem to be city. click somewhere else ");
        console.log(data);
        dispatch({
          type: "cityName",
          payload: data.city || data.locality || "",
        });
        dispatch({ type: "country", payload: data.country });
        dispatch({ type: "emoji", payload: data.countryCode });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    };
    fetchCity();
  }, [lat, lng]);

  function handleNewCity(e) {
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: lat, lng: lng },
    };
    console.log(newCity);
    onAddCity(newCity);
    navigate("/app/cities");
  }

  return (
    <form className={styles.form} onSubmit={handleNewCity}>
      {isLoadingGeoLocation && !geoCodingError && <Spinner />}
      {geoCodingError && <Message message={geoCodingError} />}
      {!isLoadingGeoLocation && !geoCodingError && (
        <>
          <div className={styles.row}>
            <label htmlFor="cityName">City name</label>
            <input
              id="cityName"
              onChange={(e) =>
                dispatch({ type: "cityName", payload: e.target.value })
              }
              value={cityName}
            />
            <span className={styles.flag}>{emoji}</span>
          </div>

          <div className={styles.row}>
            <label htmlFor="date">When did you go to {cityName}?</label>
            <input
              id="date"
              onChange={(e) =>
                dispatch({ type: "date", payload: e.target.value })
              }
              value={date}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="notes">Notes about your trip to {cityName}</label>
            <textarea
              id="notes"
              onChange={(e) =>
                dispatch({ type: "notes", payload: e.target.value })
              }
              value={notes}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary">Add</Button>
            <ButtonBack />
          </div>
        </>
      )}
    </form>
  );
}

export default Form;
