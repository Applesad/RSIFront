import React from "react";
import { useNavigate } from "react-router-dom";
import FlightForm from "../components/FlightForm";
import * as FlightService from "../services/FlightService";
import Card from "../UI/Card";
import classes from "./AddFlightPage.module.css";

function AddFlightPage() {
  const navigate = useNavigate();

  const handleSubmit = async (model) => {
    try {
      const addedFlight = await FlightService.addFlight(model);
      alert("Flight added successfully!");

      navigate(`/flightDetails/${addedFlight.flightId}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className={classes.flight}>
      <Card>
        <h1>Add New Flight</h1>
        <FlightForm onSubmit={handleSubmit} />
      </Card>
    </section>
  );
}

export default AddFlightPage;
