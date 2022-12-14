// import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AlertInfo from "../components/AlertInfo";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { formDataVerifyPassword } from "../utils/UserFonction";

const ProfilPage = () => {
  // const [datas, setDatas] = useState([]);
  const [user, setUser] = useState("");
  const [str, setStr] = useState("");
  const [strResponse, setStrResponse] = useState("");
  const [color, setColor] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [isActiv, setIsActiv] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disabledValue, setDisabledValue] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    birthday: "",
    email: "",
    lastName: "",
    password: "",
    phone: "",
    reservations: [],
    role: { id: 0, name: "" },
    username: "",
  });
  const initialPassword = {
    id: user.id,
    lastPassword: "",
    newPassword: "",
    repeatPassword: "",
  };
  const [updatePassword, setUpdatePassword] = useState(initialPassword);

  useEffect(() => {
    const userCurrent = AuthService.getCurrentUser();

    UserService.getUserByEmail(userCurrent.email).then((res) => {
      setCurrentUser(res.data);
      setUser(res.data);
    });
  }, []);
  const convertDateToString = (date) => {
    let today = new Date(date);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const str =
      today.getDate() +
      " " +
      month[today.getMonth()] +
      " " +
      today.getFullYear();
    // console.log(str);
    return str;
  };
  const handleChange = (event) => {
    setCurrentUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if(event.target.name === "phone"){
      let convertNum = event.target.value.toString()
      setCurrentUser((prev) => ({
        ...prev,
        [event.target.name]: convertNum,
      }));
    }
  };

  const activEdit = () => {
    let currentUser = {
      id: user.id,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
      email: user.email,
      birthday: user.birthday,
      phone: user.phone,
    };
    setCurrentUser(currentUser);
    setEdit(true);
    // console.log("user", user, currentUser);
  };

  const editSubmit = async () => {
    let editUser = {
      id: currentUser.id,
      lastName: currentUser.lastName,
      username: currentUser.username,
      role: currentUser.role,
      email: currentUser.email,
      birthday: currentUser.birthday,
      phone: currentUser.phone,
    };


    UserService.editUserProfil(editUser).then((res) => {
      setUser(res.data);
    });


    setEdit(false);
  };

  const handleditPassword = (event) => {
    setUpdatePassword((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }));
    formDataVerifyPassword(event.target.value);
    if (event.target.name === "newPassword") {
      setIsActiv(true);
      if (formDataVerifyPassword(event.target.value)) {
        setStr("Mot de passe fort");
        setColor("#9cd06b");
        setDisabledValue(false);
      } else {
        setStr("Mot de passe faible");
        setColor("#f76217");
        setDisabledValue(true);
      }
    }
    // console.log(updatePassword);
  };

  const handleSubmitPassword = () => {
    if (updatePassword.lastPassword === "") {
      setStrResponse("Veuillez entrer votre mot de passe actuel");
      setIsOk(true);
    } else {
      if (updatePassword.newPassword === updatePassword.repeatPassword) {
        let finalObjet = {
          id: user.id,
          lastPassword: updatePassword.lastPassword,
          newPassword: updatePassword.newPassword,
        };
        
        console.log(finalObjet)
        UserService.editpassword(finalObjet)
        .then((res) => {
          setUpdatePassword(initialPassword);
          setIsActiv(false);
          // setStrResponse(res.data);
          // setIsOk(true);
        });
      } else {
        setStrResponse(
          "Les nouveau mot de passe et le mot de passe de confirmation ne correspondent pas"
        );
        setIsOk(true);
      }
    }
  };

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
                Pseudo
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder="Prenom"
                  value={currentUser.username}
                  name="username"
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
            {/* <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCity"
            >
              <Form.Label column sm={3}>
                Num??ro
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
            </Form.Group> */}
<Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCity"
            >
              <Form.Label column sm={3}>
                Num??ro
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  placeholder="Telephone"
                  value={parseInt(currentUser.phone)}
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
                <Button
                  variant="primary"
                  className="buttonSubmit"
                  onClick={editSubmit}
                >
                  Modifier
                </Button>
              </Col>
            </Form.Group>
          </Form>
        ) : (
          <div style={{ padding: "1rem 1rem 1rem 0" }}>
            <h3>Donn??es personnelles</h3>
            <h5>Nom : {user.lastName} </h5>
            <h5>Pseudo : {user.username} </h5>
            <h5>Email : {user.email} </h5>
            <h5>
              Date de naissance :{" "}
              {currentUser.birthday === null
                ? "Non renseign??"
                : convertDateToString(user.birthday)}{" "}
            </h5>
            <h5>
              Telephone : {user.phone === 0 ? "Non renseign??" : user.phone}{" "}
            </h5>
            <br />
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
                    value={updatePassword.lastPassword}
                    name="lastPassword"
                    onChange={handleditPassword}
                    placeholder="Veuillez entrer votre mot de passe actuel"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Nouveau Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handleditPassword}
                    value={updatePassword.newPassword}
                    name="newPassword"
                    placeholder="Veuillez entrer votre nouveau mot de passe"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Confirmation du Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={handleditPassword}
                    value={updatePassword.repeatPassword}
                    name="repeatPassword"
                    placeholder="Veuillez rentrer votre nouveau mot de passe"
                  />
                </Form.Group>
              </Col>
              {isActiv && <p style={{ color: color }}>{str}</p>}
            </Row>
            <br />

            {disabledValue ? (
              <Button onClick={handleSubmitPassword} disabled>
                Modifier
              </Button>
            ) : (
              <Button onClick={handleSubmitPassword}>Modifier</Button>
            )}
          </Form>
          {isOk && (
            <div style={{ color: "blue" }}>
              <AlertInfo
                text={strResponse}
                typeVariant={"info"}
                show={isOk}
                setisShow={setIsOk}
              />
            </div>
          )}
        </div>
      </div>
      {/* <div style={{ width: "90%", margin: "auto", color: "#3C6DA6" }}>
        <ReservationTable datas={datas} setDatas={setDatas} />
      </div> */}
    </div>
  );
};
export default ProfilPage;
