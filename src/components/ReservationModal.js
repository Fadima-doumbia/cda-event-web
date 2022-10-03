import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

const ReservationModal = (props) => {
  const [show, setShow] = useState(false);
  const [formReserved, setFormReserved] = useState({ email: "", id: 0 });
  const [user, setUser] = useState("");
  let reservation = {
    annulation: false,
    user: { id: 0 },
    event: { id: 0 },
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setFormReserved((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(formReserved);
  };

  const reserver = async () => {
    let userId = 0;
    let test;
    await axios.get(`http://localhost:8080/api/events/users/email/${formReserved.email}`)
      .then((res) => {
        setUser(res.data);
        userId = res.data.id;
        test= res.data;
      });

    reservation.event.id = props.id;
    reservation.user.id = test.id;
    axios
      .post(`http://localhost:8080/api/events/reservation`, reservation)
      .then((res) => {
        console.log("reservation", res.data);
      });

    // axios
    //   .get(`http://localhost:8080/api/events/allReservations`)
    //   .then((res) => {
    //     console.log(res.data);
    //   });

    handleClose();
  };

  return (
    <>
      <Button
        // variant="primary"
        className="buttonSubmit"
        onClick={handleShow}
        // style={{
          //   heigth: "35px",
          // width: "auto",
          // backgroundColor: "#3C6DA6",
          //   maxWidth: "40%",
        // }}
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
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ margin: "0" }}>
            Evenemment : <span style={{ fontSize: "12px" }}>Vente privé</span>
          </p>
          <p style={{ margin: "0" }}>
            Adresse :{" "}
            <span style={{ fontSize: "12px" }}>20 rue de louvre BKO</span>
          </p>
          <p style={{ margin: "0" }}>
            Date et heure :{" "}
            <span style={{ fontSize: "12px" }}>
              Le 20 janvier 2022 de 14h à 18h
            </span>
          </p>
          <p style={{ margin: "0" }}>
            Prix : <span style={{ fontSize: "12px" }}>20 000 fcfa</span>
          </p>
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
                  //   plaintext
                  // readOnly
                  defaultValue="email@example.com"
                  value={formReserved.email}
                  name="email"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Form>
          {/* <hr style={{ backgroundColor: "blue", height: "2px" }} /> */}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "2px solid #3C6DA6" }}>
          <Button className="buttonSubmit" onClick={reserver}>
            Reserver
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservationModal;
