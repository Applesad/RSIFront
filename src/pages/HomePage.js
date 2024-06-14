import React from "react";
import FlightSearchComponent from "../components/FlightSearchComponent";
import classes from "./HomePage.module.css";

function HomePage() {
  return (
    <div className={classes.HomePageDetails}>
      <FlightSearchComponent />
    </div>
  );
}

export default HomePage;
