import "../styles/NavBar.css";
import OffRoundIcon from "@rsuite/icons/OffRound";
import AuthService from "../services/auth.service";
import { NavLink } from "react-router-dom";
import { Magic } from "react-bootstrap-icons";
import { useState } from "react";
import { useEffect } from "react";
import eventBus from "../common/EventBus";
import { Button } from "@mui/material";

export default function Navbars() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
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

    eventBus.on("logout", () => {
      logout();
    });
    return () => {
      eventBus.remove("logout");
    };
  }, []);

  const logout = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setIsAuth(false);
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

      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
       
        {isAuth === false && (
          <li className="">
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
          <li className="">
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
          <li className="">
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
          <li className="">
            <NavLink
              to="home"
              className={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
            >
              <Magic />
              Evenements
            </NavLink>
          </li>
        )}
        {showAdminBoard && (
          <li className="">
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
          <li className="navigation-menu li">
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
          <li className="navigation-menu li">
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
          <li className="navigation-menu li">
            <NavLink to="login">
              <Button
                color="primary"
                style={{ backgroundColor: "gray" }}
                onClick={logout}
              >
                <OffRoundIcon />
                {/* logout */}
              </Button>
            </NavLink>
          </li>
        )}

        </ul>
      </div>
    </nav>
  );
}
