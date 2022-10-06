import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  // const [successful, setSuccessful] = useState(false);
  // const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // const refreshPage = () => {
  //   window.location.reload(false);
  // }

  const handleSubmit = () => {
    AuthService.login(formData).then(
      (response) => {
        // setMessage(response.data.message);
        // setSuccessful(true);
        navigate("/event");
        // refreshPage();
        window.location.reload(false);
        // window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // setMessage(resMessage);
        // setSuccessful(false);
      }
    );
  };

  return (
    <div className="">
      <h2 style={{ textAlign: "center" }}>Connectez-vous à votre compte</h2>
      <div className="card card-container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <Form style={{ padding: "1rem" }}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Label column>Pseudo</Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
                value={formData.username}
                name="username"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Label column>Password</Form.Label>
            <Col sm="7">
              <Form.Control
                type="password"
                placeholder="Password"
                value={formData.password}
                name="password"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Button variant="submit" onClick={handleSubmit}>
            Primary
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
