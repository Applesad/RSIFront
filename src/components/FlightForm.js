import React, { useState } from "react";
import classes from "./FlightForm.module.css";

function FlightForm({ onSubmit }) {
  const [model, setModel] = useState({
    flightFrom: "",
    flightTo: "",
    dateFlight: "",
    hourFlight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prevState) => ({ ...prevState, [name]: value }));
  };

  const allFieldsFilled = () => {
    return Object.values(model).every((value) => value.trim() !== "");
  };

  const isDisabled = !allFieldsFilled();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted model: ", model); // Log to check the data before sending
    onSubmit(model);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.inputGroup}>
        <div className={classes.labelInputContainer}>
          <label htmlFor="flightFrom">Flight From</label>
          <input
            className={classes.input}
            id="flightFrom"
            name="flightFrom"
            value={model.flightFrom}
            onChange={handleChange}
          />
        </div>
        <div className={classes.labelInputContainer}>
          <label htmlFor="flightTo">Flight To</label>
          <input
            className={classes.input}
            id="flightTo"
            name="flightTo"
            value={model.flightTo}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.inputGroup}>
        <div className={classes.labelInputContainer}>
          <label htmlFor="dateFlight">Flight Date</label>
          <input
            type="date"
            className={classes.input}
            id="dateFlight"
            name="dateFlight"
            value={model.dateFlight}
            onChange={handleChange}
          />
        </div>
        <div className={classes.labelInputContainer}>
          <label htmlFor="hourFlight">Flight Time</label>
          <input
            type="time"
            className={classes.input}
            id="hourFlight"
            name="hourFlight"
            value={model.hourFlight}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className={`${classes.actions} ${isDisabled ? classes.buttonDisabled : ""}`}
        disabled={isDisabled}
      >
        Add Flight
      </button>
    </form>
  );
}

export default FlightForm;