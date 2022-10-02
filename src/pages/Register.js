import React, { useState } from "react";
import AuthService from "../services/auth.service";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const initialState = {
    username: "",
    lastName: "",
    email: "",
    role: "admin",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = () => {
    AuthService.register(formData).then(
      (response) => {
        setMessage(response.data.message);
        console.log(response)
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
    <div className="col-md-8">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Firstname
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
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              LastName
            </Form.Label>
            <Col sm="7">
              <Form.Control
              type="text"
                value={formData.lastName}
                name="lastName"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="text"
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
          >
            <Form.Label column sm="2">
              Password
            </Form.Label>
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
          <Button variant="primary" onClick={handleSubmit}>Primary</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
