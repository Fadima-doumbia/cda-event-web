import { Outlet } from "react-router-dom";
import Navbars from "../components/Navbars";

const Layout = () => {

  return (
    <>
      <Navbars />
      <Outlet />
    </>
  );
};
export default Layout;
