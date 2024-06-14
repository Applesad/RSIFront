import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import classes from "./FlightCardComponent.module.css";

const FlightCardComponent = ({ flight }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  if (!flight) {
    return <p>No details available.</p>;
  }

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`${classes.card} ${isHovered ? classes.hovered : ""}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.iconWrapper}>
        <FontAwesomeIcon icon={faPlane} className={classes.icon} />
      </div>
      <div className={classes.cardContent}>
        <h2 className={classes.cardTitle}>
          Flight from {flight.flightFrom} to {flight.flightTo}
        </h2>
        <div className={classes.detailsWrapper}>
          <div className={classes.detailItem}>
            <strong>Flight Time:</strong> {flight.hourFlight}
          </div>
          <div className={classes.detailItem}>
            <strong>Flight Date:</strong> {new Date(flight.dateFlight).toLocaleDateString()}
          </div>
        </div>
        <div className={classes.cardButton}>
          <button onClick={() => navigate(`/flightDetails/${flight.flightId}`)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCardComponent;