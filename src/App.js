import * as React from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import { setAuthToken } from "./common/setAuthToken";
import Layout from "./layout/Layout";
import AboutPage from "./pages/AboutPage";
import AdminEventPage from "./pages/AdminEventPage";
// import BoardModerator from "./pages/BoardModerator";
// import BoardUser from "./pages/BoardUser";
import Event from "./pages/Event";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ProfilPage from "./pages/ProfilPage";
import Register from "./pages/Register";
import ReservationPage from "./pages/ReservationPage";
import Users from "./pages/Users";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
}
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="home" element={<HomePage />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<AdminEventPage />} />
            <Route path="reservation" element={<ReservationPage />} />
            <Route path="profil" element={<ProfilPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="users" element={<Users />} />
            <Route path="event" element={<Event />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
