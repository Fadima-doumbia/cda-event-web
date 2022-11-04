// import {  useEffect } from "react";
import "../styles/NavBar.css";
// import { Magic } from "react-bootstrap-icons";
// import AdminIcon from "@rsuite/icons/Admin";
import OffRoundIcon from "@rsuite/icons/OffRound";
// import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import { NavLink, useNavigate } from "react-router-dom";
import { Magic } from "react-bootstrap-icons";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "bootstrap";

export default function Navbars() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  let navigate = useNavigate();
  let activeStyle = {
    textDecoration: "none",
    color: "white",
  };

  let activeClassName = "underline";
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowModeratorBoard(user.roles.includes("ROLE_USER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    if (user !== null) {
      setIsAuth(true);
    }

    // eventBus.on("logout", () => {
    //   logOut();
    // });
    // return () => {
    //   eventBus.remove("logout");
    // };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Eagle Event
      </a>

      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <ul
        className="navigation-menu ul"
        style={{
          backgroundColor: "#3C6DA6",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {isAuth === false && (
          <li>
            <NavLink
              to="register"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Register
            </NavLink>
          </li>
        )}
        {isAuth === false && (
          <li>
            <NavLink to="login">
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  login
                </span>
              )}
            </NavLink>
          </li>
        )}
        {showAdminBoard && (
          <li>
            <NavLink
              to="event"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Evenements
            </NavLink>
          </li>
        )}
        {showModeratorBoard && (
          <li>
            <NavLink
              to="home"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <Magic />
              Evenements
            </NavLink>
          </li>
        )}
        {showAdminBoard && (
          <li>
            <NavLink to="users">
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  Utilisateurs
                </span>
              )}
            </NavLink>
          </li>
        )}
        {showModeratorBoard && (
          <li>
            <NavLink
              to="reservation"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Mes Reservations
            </NavLink>
          </li>
        )}
        {isAuth && (
          <li>
            <NavLink to="login">
              {({ isActive }) => (
                <span className={isActive ? activeClassName : undefined}>
                  Profil
                </span>
              )}
            </NavLink>
          </li>
        )}
        {isAuth && (
          <li>
            <Button variant="secondary" onClick={logOut}>
              <OffRoundIcon />
               logout
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
  //   <nav className="navigation">
  //   <a href="/" className="brand-name">
  //     Eagle Event
  //   </a>

  //   <button
  //     className="hamburger"
  //     onClick={() => {
  //       setIsNavExpanded(!isNavExpanded);
  //     }}
  //   >
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="h-5 w-5"
  //       viewBox="0 0 20 20"
  //       fill="white"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   </button>

  //   <div
  //     className={
  //       isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
  //     }
  //   >
  //     <ul>
  //       {showModeratorBoard ? (
  //         <li>
  //           <a href="/home">
  //             <Magic />
  //             Evenements
  //           </a>
  //         </li>
  //       ) : null}

  //       {showModeratorBoard ? (
  //         <li>
  //           <a href="/reservation">Mes Reservations</a>
  //         </li>
  //       ) : null}

  //       {isAuth ? null : (
  //         <li>
  //           <a href="/login">Login</a>
  //         </li>
  //       )}

  //       {isAuth ? null : (
  //         <li>
  //           <a href="/register">Register</a>
  //         </li>
  //       )}

  //       {showAdminBoard ? (
  //         <li>
  //           <a href="/users">Utilisateurs</a>
  //         </li>
  //       ) : null}

  //       {showAdminBoard ? (
  //         <li>
  //           <a href="/event">Evenements</a>
  //         </li>
  //       ) : null}

  //       {isAuth ? (
  //         <li>
  //           <a href="/profil">
  //             <AdminIcon />
  //             Profil
  //           </a>
  //         </li>
  //       ) : null}

  //       {isAuth ? (
  //         <li>
  //           <Button variant="secondary" onClick={logOut}>
  //             <OffRoundIcon /> logout
  //           </Button>
  //         </li>
  //       ) : null}
  //     </ul>
  //   </div>
  // </nav>