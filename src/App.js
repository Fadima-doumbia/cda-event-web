import * as React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import Layout from "./layout/Layout";
import BoardAdmin from "./pages/BoardAdmin";
import BoardModerator from "./pages/BoardModerator";
import BoardUser from "./pages/BoardUser";
import Event from "./pages/Event";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Users from "./pages/Users";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="user" element={<BoardUser />} />
            <Route path="mod" element={<BoardModerator />} />
            <Route path="admin" element={<BoardAdmin />} />
            <Route path="users" element={<Users />} />
            <Route path="event" element={<Event />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
