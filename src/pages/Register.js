import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { formDataVerifyPassword, verifyIfStringIsEmpty } from "../utils/UserFonction";

const Register = () => {
  const initialState = {
    username: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [successful, setSuccessful] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [isActiv, setIsActiv] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [disabledValue, setDisabledValue] = useState(true);
  const [color, setColor] = useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "password") {
      setIsActiv(true);
      if (formDataVerifyPassword(event.target.value)) {
        setMessages("Mot de passe fort");
        setColor("#9cd06b");
        setDisabledValue(false);
        setIsOk(true);
      } else {
        setMessages("Mot de passe faible");
        setColor("#f76217");
        setDisabledValue(true);
      }
    }
    formDataVerifyPassword(event.target.value);
    if (formDataVerifyLength(formData) && formDataVerify(formData)) {
      if (formDataVerifyPassword(event.target.value)) {
        setDisabledValue(false);
      }
    } else {
      setDisabledValue(true);
    }
  };

  // const formDataVerifyPassword = (str) => {
  //   let response = false;
  //   if (
  //     str.match(/[0-9]/g) &&
  //     str.match(/[A-Z]/g) &&
  //     str.match(/[a-z]/g) &&
  //     str.match(/[^a-zA-Z\d]/g) &&
  //     str.length >= 8
  //   ) {
  //     response = true;
  //   }

  //   return response;
  // };

  const formDataVerify = (form) => {
    let response = false;
    if (
      verifyIfStringIsEmpty(form.username) &&
      verifyIfStringIsEmpty(form.lastName) &&
      verifyIfStringIsEmpty(form.password) &&
      verifyIfStringIsEmpty(form.email)
    ) {
      response = true;
    }
    return response;
  };

  const formDataVerifyLength = (form) => {
    let response = false;
    if (
      form.username.length > 3 &&
      form.lastName.length > 3 &&
      form.password.length > 7 &&
      form.email.length > 4 &&
      form.email.includes("@")
    ) {
      response = true;
    }
    return response;
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
      <h2 style={{ textAlign: "center" }}>Créez votre compte</h2>
      <div className="card card-container">
        <Form style={{ padding: "1rem" }}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextEmail"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Form.Label column>Pseudo
            <span className="text-danger fw-bold" >(*)</span>
            </Form.Label>
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
            <Form.Label column>LastName<span className="text-danger fw-bold" >(*)</span></Form.Label>
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
            <Form.Label column>Email<span className="text-danger fw-bold" >(*)</span></Form.Label>
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
            
            <Form.Label column>Password<span className="text-danger fw-bold" >(*)</span></Form.Label>
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
