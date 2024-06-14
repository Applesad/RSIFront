import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import image from "../assets/2.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 className={classes.logo}>
          <NavLink to="/" className={classes.logoLink}>
            FlightMaster
          </NavLink>
        </h1>
        <nav>
          <ul className={classes.nav}>
            <li>
              <NavLink to="/addFlight">Add Flight</NavLink>
            </li>
          </ul>
          <ul className={classes.nav}>
            <li>
              <NavLink to="/flights">Flight List</NavLink>
            </li>
          </ul>
          <ul className={classes.nav}>
            <li>
              <NavLink to="/searchReservation">Reservations</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className={classes["main-image"]}>
        <img src={image} alt="An airplane." />
      </div>
    </Fragment>
  );
};

export default Header;
