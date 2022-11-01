import { useState, useEffect } from "react";
import "../styles/NavBar.css";
import { Magic } from "react-bootstrap-icons";
import AdminIcon from "@rsuite/icons/Admin";
import OffRoundIcon from "@rsuite/icons/OffRound";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import eventBus from "../common/EventBus";
import { useNavigate } from "react-router-dom";

export default function Navbars() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_USER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    if (user !== null) {
      setIsAuth(true);
    }

    eventBus.on("logout", () => {
      logOut();
    });
    return () => {
      eventBus.remove("logout");
    };
  }, [refresh]);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
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

      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          {showModeratorBoard ? (
            <li>
              <a href="/home">
                <Magic />
                Evenements
              </a>
            </li>
          ) : null}

          {showModeratorBoard ? (
            <li>
              <a href="/reservation">Mes Reservations</a>
            </li>
          ) : null}

          {/* {showModeratorBoard ? (
            <li>
              <a href="/calendar">
                <Calendar />
                Mon calendrier
              </a>
            </li>
          ) : null} */}

          {isAuth ? null : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}

          {isAuth ? null : (
            <li>
              <a href="/register">Register</a>
            </li>
          )}

          {showAdminBoard ? (
            <li>
              <a href="/users">Utilisateurs</a>
            </li>
          ) : null}

          {showAdminBoard ? (
            <li>
              <a href="/event">Evenements</a>
            </li>
          ) : null}

          {isAuth ? (
            <li>
              <a href="/profil">
                <AdminIcon />
                Profil
              </a>
            </li>
          ) : null}

          {isAuth ? (
            <li>
              <Button variant="secondary" onClick={logOut}>
                <OffRoundIcon /> logout
              </Button>
            </li>
          ) : (
            <li>
              <Button variant="secondary" onClick={logOut}>
                <a href="/login">
                  <OffRoundIcon />
                  Login
                </a>
              </Button>
            </li>
          )}

          {isAuth ? null : (
            <li>
              <a href="/about">A propos</a>
            </li>
          )}
          {/* </ul> */}
          {/* </div> */}
        </ul>
      </div>
    </nav>
  );
}
