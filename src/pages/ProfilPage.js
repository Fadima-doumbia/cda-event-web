import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ReservationTable from "../components/form - table/ReservationTable";
import EditUser from "../../src/components/modal - card/EditUser.js";

const ProfilPage = () => {
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    lastName: "",
    firstName: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events/allReservations")
      .then((res) => {
        setDatas(res.data);
        console.log(res.data);
      });

    axios
      .get("http://localhost:8080/api/events/users/email/user@emaill")
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  const handleChange = (event) => {
    console.log(currentUser);   
    setCurrentUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const activEdit = (event) => {
    let currentUser={
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      role: user.role,
      email: user.email,
      birthday: new Date(user.birthday),
      phone: user.phone,
    }
    setCurrentUser(currentUser);
    setEdit(true);
    console.log("user", user)
  };

  const editSubmit=async()=>{
    await axios
      .put(`http://localhost:8080/api/events/users/${currentUser.id}`, currentUser)
      .then((res) => {
        console.log(res.data);
      });
      await axios
      .get("http://localhost:8080/api/events/users/email/user@emaill")
      .then((res) => {
        setUser(res.data);
      });

      setEdit(false);

  }
  return (
    <div>
      <div className="profil-container">
        {edit ? (
          <Form className="form">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalName"
            >
              <Form.Label column sm={3}>
                Nom
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Nom"
                  value={currentUser.lastName}
                  name="lastName"
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
                Prenom
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Prenom"
                  value={currentUser.firstName}
                  name="firstName"
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
                Email
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={currentUser.email}
                  name="email"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalAddress"
            >
              <Form.Label column sm={3}>
                Date de naissance
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="date"
                  placeholder="Date de naissance"
                  value={currentUser.birthday}
                  name="birthday"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCity"
            >
              <Form.Label column sm={3}>
                Numéro
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Telephone"
                  value={currentUser.phone}
                  name="phone"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group> 

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  variant="primary"
                  onClick={() => setEdit(false)}
                  //   onClick={handleSubmit}
                  className="buttonSubmit"
                >
                  Annuler
                </Button>
                <Button variant="primary" className="buttonSubmit" onClick={editSubmit}>
                  Creer
                </Button>
              </Col>
            </Form.Group>
          </Form>
        ) : (
          <div style={{ padding: "1rem 1rem 1rem 0" }}>
            <h3>Donnée Personnelles</h3>
            <h5>Nom : {user.lastName} </h5>
            <h5>Prenom : {user.firstName} </h5>
            <h5>Email : {user.email} </h5>
            <h5>Date De Naissance : {user.birthday} </h5>
            <h5>Telephone : {user.phone} </h5>
            <Button onClick={activEdit}>Modifier</Button>
            {/* <EditUser user={user}/> */}
          </div>
        )}

        <div className="borderBar">
          <h3>Modifier le mot de passe</h3>
          <Form>
            <Row>
              <Col>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Mon Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Veuillez entrer votre mot de passe actuel"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Nouveau Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Veuillez entrer votre nouveau mot de passe"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Confirmation du Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Veuillez rentrer votre nouveau mot de passe"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button>Modifier</Button>
          </Form>
        </div>
      </div>
      <div style={{ width: "90%", margin: "auto", color: "#3C6DA6" }}>
        <ReservationTable datas={datas} setDatas={setDatas} />
        {/* <TableEvent /> */}
      </div>
    </div>
  );
};
export default ProfilPage;
