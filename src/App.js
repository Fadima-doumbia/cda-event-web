import * as React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import Layout from "./layout/Layout";
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
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login/>} />
            <Route path="home" element={<HomePage/>} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<AdminEventPage />} />
            <Route path="reservation" element={<ReservationPage/>} />
            <Route path="profil" element={<ProfilPage />} />
            {/* <Route path="user" element={<BoardUser />} />
            <Route path="mod" element={<BoardModerator />} /> 
            <Route path="admin" element={<BoardAdmin />} /> */}
            <Route path="users" element={<Users />} />
            <Route path="event" element={<Event />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
