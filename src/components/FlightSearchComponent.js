import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./FlightSearchComponent.module.css";

const FlightSearchComponent = () => {
  const navigate = useNavigate();
  const [cityTo, setCityTo] = useState("");
  const [cityFrom, setCityFrom] = useState("");
  const [flightDate, setFlightDate] = useState("");

  const handleNavigate = () => {
    const queryParams = new URLSearchParams({
      cityTo,
      cityFrom,
      flightDate,
    }).toString();

    navigate(`/apartmentListPage?${queryParams}`);
  };

  return (
    <div className={classes.FilterCard}>
      <div className={classes.Banner}>Find your flight - Today!</div>
      <div className={classes.FilterRow}>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Flight start</label>
          <div className={classes.FootageInputs}>
            <input
              type="text"
              value={cityFrom}
              onChange={(e) => setCityFrom(e.target.value)}
              placeholder="Enter flight start"
            />
          </div>
        </div>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Flight destination</label>
          <div className={classes.FootageInputs}>
            <input
              type="text"
              value={cityTo}
              onChange={(e) => setCityTo(e.target.value)}
              placeholder="Flight destination"
            />
          </div>
        </div>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Flight destination</label>
          <div className={classes.FootageInputs}>
            <input
              type="text"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
              placeholder="Flight destination"
            />
          </div>
        </div>
      </div>
      <div>
        <br />
      </div>
      <div className={classes.FilterRow}>
        <div className={classes.FilterGroup}>
          <button onClick={handleNavigate} className={classes.NavigateButton}>
            View Flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchComponent;
