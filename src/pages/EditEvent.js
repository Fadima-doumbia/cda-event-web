import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "../styles/styles.scss";
import ListGroup from "react-bootstrap/ListGroup";

const EditEvent = (props) => {
  const initialState = {
    address: "",
    name: "",
    date: "",
    description: "",
    child: false,
    places: 0,
    prix: 0,
    heureDebut: "",
    heureFin: "",
  };
  const [formData, setFormData] = useState(props.formData);
  const [token, setToken] = useState("");
  let userToken = "";


  useEffect(() => {
    getToken();
    // axios.get("http://localhost:8080/api/events/all", {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     }}).then((res) => {
    //   setDatas(res.data);
    //   console.log(res.data)
    // });
  }, []);

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setToken(user.accessToken);
  };
  const handleChange = (event) => {
    const prix = parseInt(event.target.value);
    const places = parseInt(event.target.value);
    setFormData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "places") {
      setFormData((value) => ({
        ...value,
        [event.target.name]: places,
      }));
    }

    if (event.target.name === "prix") {
      setFormData((value) => ({
        ...value,
        [event.target.name]: prix,
      }));
    }
  };
  // const updateEventt = () => {
  //   getToken();
  //   console.log(formData);
  //   axios
  //     .put(`http://localhost:8080/api/admin/events/${formData.id}`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       datas.push(res.data);
  //       props.setLoading(!props.loading)
  //     });
  //   props.onHide();
  //   // axios.get("http://localhost:8080/api/events/all/reservations/event").then((res) => {
  //   //   props.setDatas(res.data);
  //   //   console.log(res.data)
  //   // });
  // };
  
  
  const annuler = (id) => {
    getToken();
    axios.delete(`http://localhost:8080/api/events/annuler/${id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    let filter = props.formData.reservations.filter(function (e) {
      return e.user.id != id;
    });

    console.log(id);
    // props.setDatas(filter);
  };

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="buttonSubmit">
        <Modal.Title id="contained-modal-title-vcenter">
          Modifier Evènement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ color: "#5882b3" }}>
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
              value={formData.desription}
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
                  <ListGroup.Item key={i} style={{display: "flex", justifyContent: "space-between"}}>
                    {reservation.user.username} - {reservation.user.lastName}
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
          <Button type="button" className="buttonClick" onClick={()=>props.updateevent(formData)}>
            Modifier
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="buttonClick">
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditEvent;
/**
 *     <div style={{ width: "60%", margin: "auto" }}>
      <h1>Modifier un evenement</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nom</Form.Label>
            <Form.Control
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
            as="textarea"
            placeholder="Leave a comment here"
            type="text"
            value={formData.description}
            name="description"
          />
        </FloatingLabel>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            type="text"
            value={formData.address}
            name="address"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={formData.date} name="date" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Heure Debut</Form.Label>
            <Form.Control
              type="time"
              value={formData.heureDebut}
              name="heureDebut"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Heure Fin</Form.Label>
            <Form.Control
              type="time"
              value={formData.heureFin}
              name="heureFin"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Prix</Form.Label>
            <Form.Control type="number" value={formData.prix} name="prix" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Places Disponibles</Form.Label>
            <Form.Control type="number" value={formData.places} name="places" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Autorisé aux enfants</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              value={formData.child}
              name="child"
            >
              <option>Choose...</option>
              <option>OUI</option>
              <option>NON</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
 */
