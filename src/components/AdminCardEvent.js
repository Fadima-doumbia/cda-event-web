import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditEvent from "../pages/EditEvent";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/styles.scss";

const AdminCardEvent = (props) => {
  const [formData, setFormData] = useState(props.data);
  const [data, setData] = useState();
  const [eventData, setEventData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [token, setToken] = useState("");
  let userToken = "";
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getToken();
    // getAllEvent();
  }, [modalShow]);

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setToken(user.accessToken);
  };

  const style = {
    width: "60%",
  };

  const deleteEvent = (id) => {
    getToken();
    axios.delete(`http://localhost:8080/api/admin/events/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    let filter = eventData.filter(function (e) {
      return e.id !== id;
    });
    props.setdatas(filter);
    console.log(filter);
  };

  const updateEvent = (formdata) => {
    getToken();
    axios
      .put(`http://localhost:8080/api/admin/events/${formdata.id}`, formdata, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        props.getallEvent();
      });
    setModalShow(false);
    window.location.reload();
  };

  // const annuler = (id) => {
  //   getToken();
  //   axios.delete(`http://localhost:8080/api/events/annuler/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //   });
  //   let filter = props.datas.reservations.filter(function (e) {
  //     return e.user.id != id;
  //   });

  //   console.log(id);
  // };

  // const handleChange = (event) => {
  //   const prix = parseInt(event.target.value);
  //   const places = parseInt(event.target.value);
  //   setFormData((value) => ({
  //     ...value,
  //     [event.target.name]: event.target.value,
  //   }));

  //   if (event.target.name === "places") {
  //     setFormData((value) => ({
  //       ...value,
  //       [event.target.name]: places,
  //     }));
  //   }

  //   if (event.target.name === "prix") {
  //     setFormData((value) => ({
  //       ...value,
  //       [event.target.name]: prix,
  //     }));
  //   }
  // };
// console.log(modalShow);


  return (
    <div>
      <Card className="admin-card-container">
        <Card.Header className="header-card">{formData.name}</Card.Header>
        <Card.Body>
          <div className="flex-container">
            <div style={style}>
              <p className="p">
                Places disponibles :{" "}
                <span className="span"> {formData.places} places</span>
              </p>
              <p className="p">
                Adresse : <span className="span"> {formData.address} </span>
              </p>
              <p className="p">
                Date : <span className="span"> {formData.date} </span>
              </p>
              <p className="p">
                Heure :{" "}
                <span className="span">
                  {" "}
                  {formData.heureDebut} - {formData.heureFin}{" "}
                </span>
              </p>
              <p className="p">
                Prix : <span className="span"> {formData.prix} </span>
              </p>
            </div>
            <div>
              <h5>Liste de personnes</h5>
              <ul
                
                style={{
                  height: "100px",
                  overflowY: "scroll",
                  scrollbarColor: "rebeccapurple green",
                  scrollbarWidth: "thin",
                }}
              >
              {formData.reservations.length > 0 ? (
                formData.reservations.map((reservation, i) => (
                    <li key={i}>
                      {reservation.user.username === null
                        ? "Non renseigné"
                        : reservation.user.username}{" "}
                      -{" "}
                      {reservation.user.lastName === null
                        ? "Non renseigné"
                        : reservation.user.lastName}
                      {/* {reservation.user.firstName === "" ? "non" : null} re - {reservation.user.lastName} */}
                    </li>
                ))
                ) : (
                  <li>Aucune reservation</li>
                  )}
                  </ul>
            </div>
          </div>
          <div className="admin-card-button-container">
            <Button
              variant="primary"
              onClick={() => setModalShow(true)}
              style={{ backgroundColor: "#3C6DA6" }}
            >
              Modifier
            </Button>
            <Button
              variant="primary"
              onClick={() => deleteEvent(formData.id)}
              style={{ backgroundColor: "#3C6DA6", margin: "0 1rem" }}
            >
              Supprimer
            </Button>
            <EditEvent
              formData={formData}
              show={modalShow}
              onHide={() => setModalShow(false)}
              setFormData={setFormData}
              updateevent={updateEvent}
            />
          </div>
        </Card.Body>
      </Card>

      {/* {modalShow ? (
      ) : null} */}
    </div>
  );
};
export default AdminCardEvent;
{/* <Form style={{ color: "#5882b3" }}>
<Row className="mb-3">
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Nom</Form.Label>
    <Form.Control
      style={{ color: "#3C6DA6" }}
      placeholder="Description"
      type="text"
      value={formData.name}
      name="name"
      onChange={handleChange}
    />
  </Form.Group>
</Row>
<FloatingLabel
  controlId="floatingTextarea"
  label="Description"
  className="mb-3"
>
  <Form.Control
    style={{ color: "#3C6DA6" }}
    as="textarea"
    placeholder="Description"
    type="text"
    value={formData.description}
    name="description"
    onChange={handleChange}
  />
</FloatingLabel>

<Form.Group className="mb-3" controlId="formGridAddress1">
  <Form.Label>Address</Form.Label>
  <Form.Control
    style={{ color: "#3C6DA6" }}
    placeholder="1234 Main St"
    type="text"
    value={formData.address}
    name="address"
    onChange={handleChange}
  />
</Form.Group>

<Row className="mb-3">
  <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>Heure Debut</Form.Label>
    <Form.Control
      style={{ color: "#3C6DA6" }}
      type="time"
      value={formData.heureDebut}
      name="heureDebut"
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridZip">
    <Form.Label>Heure Fin</Form.Label>
    <Form.Control
      style={{ color: "#3C6DA6" }}
      type="time"
      value={formData.heureFin}
      name="heureFin"
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>Date</Form.Label>
    <Form.Control
      type="date"
      value={formData.date}
      name="date"
      style={{ color: "#3C6DA6" }}
      onChange={handleChange}
    />
  </Form.Group>
</Row>

<Row className="mb-3">
  <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>Prix</Form.Label>
    <Form.Control
      type="number"
      value={formData.prix}
      name="prix"
      style={{ color: "#3C6DA6" }}
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridCity">
    <Form.Label>Places Disponibles</Form.Label>
    <Form.Control
      type="number"
      value={formData.places}
      name="places"
      style={{ color: "#3C6DA6" }}
      onChange={handleChange}
    />
  </Form.Group>
  <Form.Group as={Col} controlId="formGridState">
    <Form.Label>Autorisé aux enfants</Form.Label>
    <Form.Select
      defaultValue="Choose..."
      value={formData.child}
      name="child"
      style={{ color: "#3C6DA6" }}
      onChange={handleChange}
    >
      <option>Choose...</option>
      <option value={true}>OUI</option>
      <option value={false}>NON</option>
    </Form.Select>
  </Form.Group>
</Row>

<Row>
  <ListGroup>
    {formData.reservations.length > 0 ? (
      formData.reservations.map((reservation, i) => (
        <ListGroup.Item key={i}>
          {reservation.user.username} -{" "}
          {reservation.user.lastName}
          <Button onClick={() => annuler(reservation.id)}>
            {" "}
            Supprimer{" "}
          </Button>
        </ListGroup.Item>
      ))
    ) : (
      <ListGroup.Item>Aucune reservation</ListGroup.Item>
    )}
  </ListGroup>
</Row>
<br />
<Button
  type="button"
  className="buttonClick"
  onClick={() => updateEvent(formData)}
>
  Modifier
</Button>
</Form> */}