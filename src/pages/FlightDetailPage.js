import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import classes from "./FlightDetailPage.module.css";

const FlightDetailPage = () => {
  const { flightId } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await fetch(`https://localhost:7289/Flight/GetFlighById/${flightId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }
        const data = await response.json();
        setFlight(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [flightId]);

  const handleReserve = async () => {
    try {
      const response = await fetch("https://localhost:7289/api/Reservation/AddReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(flightId)
      });

      if (!response.ok) {
        throw new Error("Failed to make reservation");
      }

      const reservation = await response.json();
      generatePDF(reservation);
    } catch (error) {
      alert(error.message);
    }
  };

  const generatePDF = (reservation) => {
    const doc = new jsPDF();
    doc.text("Flight Reservation", 10, 10);
    doc.text(`Flight From: ${flight.flightFrom}`, 10, 20);
    doc.text(`Flight To: ${flight.flightTo}`, 10, 30);
    doc.text(`Flight Date: ${new Date(flight.dateFlight).toLocaleDateString()}`, 10, 40);
    doc.text(`Flight Time: ${flight.hourFlight}`, 10, 50);
    doc.text(`Reservation ID: ${reservation.reservationId}`, 10, 60);
    doc.save("reservation.pdf");
  };

  if (loading) {
    return <div>Loading flight details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!flight) {
    return <div>No flight details available.</div>;
  }

  return (
    <div className={classes.FlightDetail}>
      <h1>Flight Details</h1>
      <div className={classes.FlightCard}>
        <div className={classes.DetailItem}>
          <strong>Flight From:</strong> {flight.flightFrom}
        </div>
        <div className={classes.DetailItem}>
          <strong>Flight To:</strong> {flight.flightTo}
        </div>
        <div className={classes.DetailItem}>
          <strong>Hour of Flight:</strong> {flight.hourFlight}
        </div>
        <div className={classes.DetailItem}>
          <strong>Date of Flight:</strong> {new Date(flight.dateFlight).toLocaleDateString()}
        </div>
        <button onClick={handleReserve} className={classes.ReserveButton}>
          Reserve
        </button>
      </div>
    </div>
  );
};

export default FlightDetailPage;