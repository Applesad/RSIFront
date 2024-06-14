import Header from '../layout/Header';
import {Outlet} from "react-router-dom";

function RootLayout() {

  return (
    <>
    <Header/>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default RootLayout;
