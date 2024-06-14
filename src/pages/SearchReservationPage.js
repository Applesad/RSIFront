import React, { useState } from "react";
import { jsPDF } from "jspdf";
import classes from "./SearchReservationPage.module.css";

const SearchReservationPage = () => {
  const [reservationId, setReservationId] = useState("");
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`https://localhost:7289/api/Reservation/GetReservationById/${reservationId}`);
      if (!response.ok) {
        throw new Error("Reservation not found");
      }

      const data = await response.json();
      setReservation(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Flight Reservation", 10, 10);

    doc.setFontSize(14);
    doc.text(`Reservation ID: ${reservation.reservationId}`, 10, 30);
    doc.text(`Flight From: ${reservation.flight.flightFrom}`, 10, 40);
    doc.text(`Flight To: ${reservation.flight.flightTo}`, 10, 50);
    doc.text(`Flight Date: ${new Date(reservation.flight.dateFlight).toLocaleDateString()}`, 10, 60);
    doc.text(`Flight Time: ${reservation.flight.hourFlight}`, 10, 70);

    doc.save("reservation.pdf");
  };

  return (
    <div className={classes.SearchReservationPage}>
      <h1>Search Reservation</h1>
      <form onSubmit={handleSearch} className={classes.SearchForm}>
        <input
          type="text"
          placeholder="Enter Reservation ID"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          className={classes.SearchInput}
        />
        <button type="submit" className={classes.SearchButton}>
          Search
        </button>
      </form>

      {error && <div className={classes.Error}>{error}</div>}

      {reservation && (
        <div className={classes.ReservationDetails}>
          <h2>Reservation Details</h2>
          <div>
            <strong>Reservation ID:</strong> {reservation.reservationId}
          </div>
          <div>
            <strong>Flight From:</strong> {reservation.flight.flightFrom}
          </div>
          <div>
            <strong>Flight To:</strong> {reservation.flight.flightTo}
          </div>
          <div>
            <strong>Flight Date:</strong> {new Date(reservation.flight.dateFlight).toLocaleDateString()}
          </div>
          <div>
            <strong>Flight Time:</strong> {reservation.flight.hourFlight}
          </div>
          <button onClick={generatePDF} className={classes.PdfButton}>
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchReservationPage;