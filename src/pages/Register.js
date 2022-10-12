import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { verifyIfStringIsEmpty } from "../utils/UserFonction";

const Register = () => {
  const initialState = {
    username: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [successful, setSuccessful] = useState(false);
  const [isActiv, setIsActiv] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [disabledValue, setDisabledValue] = useState(true);
  const [color, setColor] = useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    if (verifyIfStringIsEmpty(event.target.value) === false) {
      setDisabledValue(true);
    }
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "password") {
      setIsActiv(true);
      if (
        event.target.value.match(/[0-9]/g) &&
        event.target.value.match(/[A-Z]/g) &&
        event.target.value.match(/[a-z]/g) &&
        event.target.value.match(/[^a-zA-Z\d]/g) &&
        event.target.value.length >= 8
      ) {
        setMessages("Mot de passe fort");
        setColor("#9cd06b");
        setDisabledValue(false);
      } else {
        setMessages("Mot de passe faible");
        setColor("#f76217");
        setDisabledValue(true);
      }
    }

    if (
      verifyIfStringIsEmpty(formData.email) === true &&
      verifyIfStringIsEmpty(formData.lastName) === true &&
      verifyIfStringIsEmpty(formData.username) === true &&
      verifyIfStringIsEmpty(formData.password) === true
    ) {
      setDisabledValue(false);
    } else {
      setDisabledValue(true);
    }
  };

  const handleSubmit = () => {
    AuthService.register(formData).then(
      (response) => {
        setMessage(response.data.message);
        console.log(response);
        setSuccessful(true);
        navigate("/login");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };


  return (
    <div className="">
      <h2 style={{ textAlign: "center" }}>Créer votre compte</h2>
      <div className="card card-container">
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
            controlId="formPlaintextEmail"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Label column>LastName</Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Label column>Email</Form.Label>
            <Col sm="7">
              <Form.Control
                type="email"
                value={formData.email}
                name="email"
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
              {isActiv && <p style={{ color: color }}>{messages}</p>}
            </Col>
          </Form.Group>
          {disabledValue ? (
            <Button variant="primary" onClick={handleSubmit} disabled>
              Créer
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Créer
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Register;
