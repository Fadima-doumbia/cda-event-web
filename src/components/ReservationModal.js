import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import CardDetailsEvent from "./CardDetailsEvent";
import ReservationService from "../services/reservation.service";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import AlertInfo from "./AlertInfo";
import { Alert } from "bootstrap";

const ReservationModal = (props) => {
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShow, setisShow] = useState(false);

  const [formReserved, setFormReserved] = useState({ email: "", id: 0 });
  const [user, setUser] = useState("");
  let reservation = {
    annulation: false,
    user: { id: 0 },
    event: { id: 0 },
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let userToken = "";
  const [msg, setMsg] = useState("");

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setUser(user);
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleChange = (event) => {
    setFormReserved((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(formReserved);
  };

  const reserver = async () => {
    getToken();
    if (user.email === formReserved.email) {
      reservation.event.id = props.id;
      reservation.user.id = user.id;
      console.log(userToken);

      ReservationService.postReservation(reservation).then((res) => {
        console.log("reservation", res.data);
      });

      handleClose();
    } else {
      setIsError(true);
      setMsg("Email incorrecte ");
    }
  };

  return (
    <>
      <Button
        id={"open-modal" + props.id}
        className="buttonSubmit"
        onClick={handleShow}
      >
        Reserver
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        style={{ color: "#5882b3" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reserver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Êtes-vous sûre de vouloir réserver pour cet événement ?</h3>

          <p style={{ margin: "0" }}>
            Evenemment :{" "}
            <span style={{ fontSize: "12px" }}>
              Vente privé {props.event.name}
            </span>
          </p>
          <p style={{ margin: "0" }}>
            Adresse :{" "}
            <span style={{ fontSize: "12px" }}>{props.event.address}</span>
          </p>
          <p style={{ margin: "0" }}>
            Date et heure :{" "}
            <span style={{ fontSize: "12px" }}>
              Le {props.event.date} de {props.event.heureDebut} à{" "}
              {props.event.heureFin}
            </span>
          </p>
          <p style={{ margin: "0" }}>
            Prix :{" "}
            <span style={{ fontSize: "12px" }}>{props.event.prix} FCFA</span>
          </p>
          {/* <CardDetailsEvent id={props.formData.id} formData={props.formData} /> */}

          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="6" style={{ color: "#3C6DA6" }}>
                Veuillez entrer votre email :
              </Form.Label>
              <Col sm="6">
                <Form.Control
                  style={{ color: "#3C6DA6" }}
                  defaultValue="email@example.com"
                  value={formReserved.email}
                  name="email"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "2px solid #3C6DA6",
            justifyContent: "space-between",
          }}
        >
          {isError ? (
            <AlertInfo
              text={msg}
              typeVariant={"danger"}
              show={isError}
              setisShow={setIsError}
            />
          ) : null}

          <div >
            <Button className="buttonSubmitMargin" onClick={reserver}>
              Reserver
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationModal;
