import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";
import AlertInfo from "../components/AlertInfo";

const Login = () => {
  const initialState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  let navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    AuthService.login(formData).then(
      (response) => {
        navigate("/profil");
        window.location.reload(false);
      },
      (error) => {
        setMsg("Pseudo ou mots de passe ");
        setIsError(true);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };

  return (
    <div className="">
      <h2 style={{ textAlign: "center" }}>Connectez-vous à votre compte</h2>
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
          <Button className="buttonSubmitMargin" variant="submit" onClick={handleSubmit}>
            Connexion
          </Button>
        </Form>
        {msg===""?null:
        <AlertInfo text={msg} typeVariant="danger" show={isError} setisShow={setIsError}/> }
      </div>
    </div>
  );
};

export default Login;
