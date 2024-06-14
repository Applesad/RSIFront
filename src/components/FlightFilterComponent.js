import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import classes from "./FlightFilterComponent.module.css";

const areEqual = (prevProps, nextProps) => {
  const filtersEqual = Object.keys(prevProps.filters).every((key) => {
    return prevProps.filters[key] === nextProps.filters[key];
  });

  return filtersEqual;
};

const FlightFilterComponent = ({ onFilterChange, filters }) => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [flightFrom, setFlightFrom] = useState(filters.flightFrom);
  const [flightTo, setFlightTo] = useState(filters.flightTo);
  const [dateFlight, setDateFlight] = useState(filters.dateFlight);
  const [sortOrder, setSortOrder] = useState(filters.sortOrder || "default");

  useEffect(() => {
    const newFilters = {
      flightFrom,
      flightTo,
      dateFlight,
      sortOrder,
    };
    
    const hasValue = Object.values(newFilters).some((value) => value !== null);

    if (hasValue) {
      const delayDebounce = setTimeout(() => {
        onFilterChange(newFilters);
      }, 500);

      return () => clearTimeout(delayDebounce);
    }
  }, [flightFrom, flightTo, dateFlight, sortOrder, onFilterChange]);

  return (
    <div className={classes.FilterCard}>
      <div className={classes.FilterRow}>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Sort by Date</label>
          <select
            className={classes.selectdropdown}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Flight From</label>
          <div className={classes.FootageInputs}>
            <input
              type="text"
              value={flightFrom}
              onChange={(e) => {
                const newValue = e.target.value || "";
                setFlightFrom(newValue);
                if (newValue === "") {
                  onFilterChange({ ...filters, flightFrom: "" });
                }
              }}
              placeholder="Enter departure city"
            />
          </div>
        </div>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Flight To</label>
          <div className={classes.FootageInputs}>
            <input
              type="text"
              value={flightTo}
              onChange={(e) => {
                const newValue = e.target.value || "";
                setFlightTo(newValue);
                if (newValue === "") {
                  onFilterChange({ ...filters, flightTo: "" });
                }
              }}
              placeholder="Enter destination city"
            />
          </div>
        </div>
        <div className={classes.FilterGroup}>
          <label className={classes.FilterLabel}>Flight Date</label>
          <div className={classes.FootageInputs}>
            <input
              type="date"
              value={dateFlight}
              onChange={(e) => {
                const newValue = e.target.value || "";
                setDateFlight(newValue);
                if (newValue === "") {
                  onFilterChange({ ...filters, dateFlight: "" });
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlightFilterComponent, areEqual);