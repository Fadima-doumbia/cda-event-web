// import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SearchIcon from "@rsuite/icons/Search";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import InfoModal from "../components/InfoModal";
import { AddCircle, Close } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Users = () => {
  const initialState = {
    lastName: "",
    username: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
    reservations: [],
  };
  const [datas, setDatas] = useState([]);
  const [arrayUsers, setArrayUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [indexCol, setIndexCol] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  // const [token, setToken] = useState("");
  const [check, setCheck] = useState("");
  const userState = {
    lastName: "",
    username: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
    reservations: [],
  };
  const [user, setUser] = useState(userState);
  const [userEdit, setUserEdit] = useState({
    id: 0,
    lastName: "",
    username: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
    reservations: [],
  });

  useEffect(() => {
    getAllUseer();
    const usercurrent = JSON.parse(localStorage.getItem("user"));
    // setToken(user.accessToken);

    if (usercurrent.roles[0] === "ROLE_USER") {
      setLoading(true);
      // navigate("/home");
    }
  }, []);

  const getAllUseer = async () => {
    UserService.getAllUsers()
      .then((res) => {
        let sorting = res.data.sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        );
        setDatas(sorting);
        setArrayUsers(sorting);
      });
  };

  const editCol = (indexCol, user) => {
    setIsEdit(true);
    setIndexCol(indexCol);
    setUserEdit(user);
  };

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
    return str;
  };

  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === "birthday") {
      convertDateToString(event.target.value);
    }
    console.log(user);
  };

  const handleCreate = () => {
    let usert = {
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: `${user.username}${user.role}`,
    };
    if (user.role === "admin") {
      UserService.createAdmin(usert)
        .then((res) => {
          console.log(res.data);
          setIsCreate(false);
          getAllUseer();
        });
    } else {
      AuthService.register(usert)
        .then((res) => {
          console.log(res.data);
          setIsCreate(false);
          getAllUseer();
          setUser(initialState);
        });
    }

    setUser(userState);
  };

  const handleEdit = (event) => {
    setUserEdit((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));

    if(event.target.name === "phone"){
      let convertNum = event.target.value.toString()
      setUserEdit((prev) => ({
        ...prev,
        [event.target.name]: convertNum,
      }));
    }
    console.log(userEdit);
  };

  const handleEditSubmit = () => {
    UserService.editUser(userEdit)
      .then((res) => {
        console.log(res.data);
        setIsEdit(false);
        getAllUseer();
        setUserEdit(initialState);
      });
  };

  const deleteUser = async (id) => {
    UserService.deleteUser(id)
      .then((res) => {
        if (res.status === 200) {
          getAllUseer();
        }
      });
  };

  const handleChangeSearch = (event) => {
    if (event.target.value !== prevSearch) {
      switch (check) {
        case "email":
          console.log("email");
          let filteredemail = arrayUsers.filter((user) =>
            user.email.toUpperCase().includes(event.target.value.toUpperCase())
          );
          setDatas(filteredemail);
          break;
        case "role":
          console.log("role");
          let filteredrole = arrayUsers.filter((user) =>
            user.role.name.toUpperCase().includes(event.target.value.toUpperCase())
          );
          setDatas(filteredrole);
          break;
        case "username":
          console.log("username");
          let filteredusername = arrayUsers.filter((user) =>
            user.username.toUpperCase().includes(event.target.value.toUpperCase())
          );
          setDatas(filteredusername);
          break;
        default:
          console.log("lastname");
          let filtered = arrayUsers.filter((user) =>
            user.lastName.toUpperCase().includes(event.target.value.toUpperCase())
          );
          setDatas(filtered);
          break;
      }
    }
    if (event.target.value === "") {
      setDatas(arrayUsers);
    }

    setPrevSearch(event.target.value);
  };

  const handleCheck = (event) => {
    setCheck(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Container fluid>
      {loading ? (
        <InfoModal
          showValue={loading}
          modalTitle={"Page non autoris??"}
          modalText={"Erreur, vous n'etes pas autoris?? ?? acceder a cette page."}
        />
      ) : null}
      <div>
        <Form className="d-block">
          <div className="search-form-container">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChangeSearch}
            />
            <Button variant="outline-success">
              <SearchIcon />
            </Button>
          </div>
          <div className="search-options-container">
            <Col
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 1rem",
              }}
            >
              <Form.Check
                isValid
                defaultChecked
                value={"lastName"}
                type="radio"
                label="Nom"
                onChange={handleCheck}
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                value={"username"}
                isValid
                onChange={handleCheck}
                type="radio"
                label="Pseudo"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                value={"email"}
                isValid
                type="radio"
                onChange={handleCheck}
                label="Email"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                value={"role"}
                isValid
                onChange={handleCheck}
                type="radio"
                label="Role"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col>
          </div>
          <hr style={{ height: "2px", color: "#3C6DA6" }} />
        </Form>
      </div>
      <div>
        <Button variant="outline-secondary" onClick={() => setIsCreate(true)}>
          Cr??er
        </Button>

        <Table striped>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Pseudo</th>
              <th>Role</th>
              <th>Email</th>
              <th>Date de naissance</th>
              <th>Telephone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {datas.length > 0
              ? datas.map((user, i) =>
                  isEdit ? (
                    indexCol === i ? (
                      <tr key={i}>
                        <td>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Nom"
                              value={userEdit.lastName}
                              name="lastName"
                              onChange={handleEdit}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              placeholder="prenom"
                              value={userEdit.username}
                              name="username"
                              onChange={handleEdit}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              placeholder="role"
                              value={userEdit.role.id === 1 ? "U" : "A"}
                              name="role"
                              onChange={handleEdit}
                              plaintext
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Email"
                              value={userEdit.email}
                              name="email"
                              onChange={handleEdit}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Control
                              type="date"
                              placeholder="Birthday"
                              value={userEdit.birthday}
                              name="birthday"
                              onChange={handleEdit}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            {/* <Form.Control
                              type="text"
                              placeholder="Phone"
                              value={userEdit.phone}
                              name="phone"
                              onChange={handleEdit}
                            /> */}
                            <Form.Control
                              type="number"
                              placeholder="Phone"
                              value={parseInt(userEdit.phone)}
                              name="phone"
                              onChange={handleEdit}
                            />
                          </Form.Group>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            onClick={() => setIsEdit(false)}
                          >
                            {/* annuler */}
                            <Close />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={handleEditSubmit}
                          >
                            {/* edit */}
                            <PencilFill />
                          </Button>
                        </td>
                      </tr>
                    ) : null
                  ) : (
                    <tr key={i}>
                      <td>
                        {user.lastName === null
                          ? "Non renseign??"
                          : user.lastName.toUpperCase()}
                      </td>
                      <td>{user.username.toUpperCase()}</td>
                      <td>
                        {user.role.id === 1 ? "U" : null}{" "}
                        {user.role.id === 2 ? "A" : null}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.birthday === null
                          ? "Non renseign??"
                          : convertDateToString(user.birthday)}{" "}
                      </td>
                      <td>
                        {" "}
                        {user.phone === null ? "Non renseign??" : user.phone}
                      </td>
                      <td>
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteUser(user.id)}
                        >
                          <TrashFill />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => editCol(i, user)}
                        >
                          <PencilFill />
                        </Button>
                      </td>
                    </tr>
                  )
                )
              : null}

            {isCreate ? (
              <tr>
                <td>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="prenom"
                      value={user.username}
                      name="username"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="Nom"
                      value={user.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="role"
                  >
                    <option>Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">Utilisateur</option>
                  </Form.Select>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      value={user.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td></td>
                <td></td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => setIsCreate(false)}
                  >
                    <Close />
                  </Button>
                  <Button variant="outline-secondary" onClick={handleCreate}>
                    {/* Creer */}
                    <AddCircle />
                  </Button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Users;
