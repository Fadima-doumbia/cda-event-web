// import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AlertInfo from "../components/AlertInfo";
// import CardEvent from "../components/CardEvent";
import InfoModal from "../components/InfoModal";
import EventService from "../services/event.service";
// import CardEvent from "../components/modal - card/CardEvent";
// import "../styles/styles.scss";

const Event = () => {
  const initialState = {
    address: "",
    name: "",
    city: "",
    date: "",
    description: "",
    child: false,
    places: 0,
    prix: 0,
    heureDebut: "",
    heureFin: "",
  };
  const [formData, setFormData] = useState(initialState);
  // const [datas, setDatas] = useState([]);
  // const [dataSource, setDataSource] = useState([]);
  // const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShow, setisShow] = useState(false);
  let userToken = "";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // userToken = user.accessToken;
    // setToken(user.accessToken);
    if (user.roles[0] === "ROLE_USER") {
      setLoading(true);
    }
    // getAllEvent();
  }, []);

  // const getAllEvent = async () => {
  //   getToken();
  //   await axios.get("http://localhost:8080/api/events/all", {
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //     },
  //   }).then((res) => {
  //     setDatas(res.data);
  //     console.log(res.data);
  //   });
  // };

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    // setToken(user.accessToken);
  };
  const handleChange = (event) => {
    const prix = parseFloat(event.target.value);
    const places = parseInt(event.target.value);
    console.log("first");
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
  const handleSubmit = () => {
    getToken();
    if (formData.child === "true") {
      formData.child = true;
    } else {
      formData.child = false;
    }
    // axios
    //   .post(`http://localhost:8080/api/admin/events`, formData, {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   })
    EventService.createEvent(formData)
      .then((res) => {
        // setDatas((datas) => [...datas, res.data]);
        setFormData(initialState);
        setisShow(true);
      });
  };


  // console.log(datas);
  return (
    <>
      <Button variant="secondary" href="/admin">
      Liste d'événement
      </Button>
      {loading ? (
        <InfoModal
          showValue={loading}
          modalTitle={"Page non autorisé"}
          modalText={"Erreur, vous n'etes pas autorisé à acceder a cette page."}
        />
      ) : null}
      <Form className="form">
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={3}>
            Titre
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="titre"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalDescription"
        >
          <Form.Label column sm={3}>
            Description
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={formData.description}
              name="description"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalAddress">
          <Form.Label column sm={3}>
            Address
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Address"
              value={formData.address}
              name="address"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
          <Form.Label column sm={3}>
            Date
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="date"
              placeholder="Date"
              value={formData.date}
              name="date"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 flex-col"
          controlId="formHorizontalPlaces"
          sm={8}
        >
          <Col className="flex-col" sm={5}>
            <Form.Label column sm={4}>
              Places
            </Form.Label>
            <Form.Control
              sm={5}
              type="number"
              placeholder="Places"
              value={formData.places}
              name="places"
              onChange={handleChange}
            />
          </Col>
          <Col className="flex-col" sm={5}>
            <Form.Label column sm={4}>
              Prix
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Prix"
              value={formData.prix}
              name="prix"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3 flex-col"
          controlId="formHorizontalPlaces"
          sm={8}
        >
          <Col className="flex-col" sm={5}>
            <Form.Label column sm={4}>
              heureDebut
            </Form.Label>
            <Form.Control
              sm={5}
              type="time"
              placeholder="HeureDebut"
              value={formData.heureDebut}
              name="heureDebut"
              onChange={handleChange}
            />
          </Col>
          <Col className="flex-col" sm={5}>
            <Form.Label column sm={4}>
              heureFin
            </Form.Label>
            <Form.Control
              type="time"
              placeholder="HeureFin"
              value={formData.heureFin}
              name="heureFin"
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={4}>
              Enfant autorisé
            </Form.Label>
            <Col sm={6}>
              <Form.Check
                type="radio"
                label="oui"
                name="child"
                value={true}
                id="formHorizontalRadios1"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="non"
                name="child"
                value={false}
                id="formHorizontalRadios2"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </fieldset>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="buttonSubmit"
            >
              Creer
            </Button>
          </Col>
        </Form.Group>
      </Form>

      {isShow ? (
        <AlertInfo
          text="Evenement ajouté avec succès"
          typeVariant="success"
          show={isShow}
          setisShow={setisShow}
        />
      ) : null}
    </>
  );
};
export default Event;
