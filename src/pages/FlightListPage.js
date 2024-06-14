import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "./FlightListPage.module.css";
import FlightCardComponent from "../components/FlightCardComponent";
import FlightFilterComponent from "../components/FlightFilterComponent";

const FlightListPage = () => {
  const location = useLocation();

  const initializeFilters = () => {
    const queryParams = new URLSearchParams(location.search);
    return {
      flightFrom: queryParams.get("flightFrom") || "",
      flightTo: queryParams.get("flightTo") || "",
      dateFlight: queryParams.get("dateFlight") || "",
      sortOrder: queryParams.get("sortOrder") || "default",
    };
  };

  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(initializeFilters());

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7289/Flight/GetFlights?${new URLSearchParams(filters)}`);
        const data = await response.json();
        setFlightData(data.$values || []); // Extract the $values array
      } catch (err) {
        setError("Failed to fetch flight data");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => {
      const hasChanged = Object.keys(newFilters).some(
        (key) => newFilters[key] !== prevFilters[key]
      );
      return hasChanged ? newFilters : prevFilters;
    });
  };

  if (loading) {
    return <div>Loading flights...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.FlightList}>
      <FlightFilterComponent
        onFilterChange={handleFilterChange}
        filters={filters}
      />
      {flightData.length > 0 ? (
        <ul>
          {flightData.map((flight) => (
            <FlightCardComponent key={flight.flightId} flight={flight} />
          ))}
        </ul>
      ) : (
        <div>No flights found.</div>
      )}
    </div>
  );
};

export default FlightListPage;
