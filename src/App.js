import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/HomePage";
import AddFlightPage from "./pages/AddFlightPage";
import FlightDetailPage from "./pages/FlightDetailPage";
import FlightListPage from "./pages/FlightListPage";
import SearchReservationPage from "./pages/SearchReservationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/flights", element: <FlightListPage /> },
      { path: "/flightDetails/:flightId", element: <FlightDetailPage /> },
      { path: "/addFlight", element: <AddFlightPage /> },
      { path: "/searchReservation", element: <SearchReservationPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;