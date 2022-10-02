import axios from "axios";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import SearchIcon from "@rsuite/icons/Search";
import {
  Circle,
  CircleFill,
  PencilFill,
  TrashFill,
} from "react-bootstrap-icons";
import { AddCircle } from "@mui/icons-material";

const Users = () => {
  const [datas, setDatas] = useState([]);
  const [arrayUsers, setArrayUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [indexCol, setIndexCol] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [prevSearch, setPrevSearch] = useState("");
  const [token, setToken] = useState("");
  const [check, setCheck] = useState("");
  const [user, setUser] = useState({
    lastName: "",
    username: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
    reservations: [],
  });
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
  let userToken = "";

  useEffect(() => {
    getAllUseer();
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)
    userToken = user.accessToken;
    setToken(user.accessToken);
  }, []);

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }; //NE fonctionne pas dans la requette

  const getToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    userToken = user.accessToken;
    setToken(user.accessToken);
  };

  const getAllUseer = async () => {
    getToken();
    await axios
      .get("http://localhost:8080/api/admin/all", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDatas(res.data);
        setArrayUsers(res.data);
      });
  };
  const editCol = (indexCol, user) => {
    setIsEdit(true);
    setIndexCol(indexCol);
    setUserEdit(user);
    console.log(user, indexCol);
  };
  const handleChange = (event) => {
    setUser((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(user);
  };
  const handleCreate = () => {
    getToken();
    let usert = {
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: `${user.username}${user.role}`,
    };
    if (user.role === "admin") {
      console.log("first")
      axios
        .post(`http://localhost:8080/api/admin/new`, usert, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setIsCreate(false);
          getAllUseer();
        });
    } else {
      console.log(" two ")
      axios
        .post(`http://localhost:8080/api/auth/register`, usert, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setIsCreate(false);
          getAllUseer();
        });
    }
  };
  const handleEdit = (event) => {
    setUserEdit((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(userEdit);
  };
  const handleEditSubmit = () => {
    getToken();
    console.log(userEdit);
    axios
      .put(`http://localhost:8080/api/admin/users`, userEdit, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setIsEdit(false);
        getAllUseer();
      });
  };
  const deleteUser = async (id) => {
    getToken();
    await axios
      .delete(`http://localhost:8080/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
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
            user.email.includes(event.target.value)
          );
          setDatas(filteredemail);
          break;
        case "role":
          console.log("role");
          let filteredrole = arrayUsers.filter((user) =>
            user.role.includes(event.target.value)
          );
          setDatas(filteredrole);
          break;
        case "username":
          console.log("username");
          let filteredusername = arrayUsers.filter((user) =>
            user.username.includes(event.target.value)
          );
          setDatas(filteredusername);
          break;
        default:
          console.log("lastname");
          let filtered = arrayUsers.filter((user) =>
            user.lastName.includes(event.target.value)
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
                label="Prenom"
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
            {/* <Col className="search-options">
              <Form.Check
                isValid
                checked
                type="radio"
                label="Croissant"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                isValid
                type="radio"
                label="Decroissant"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
            </Col> */}
          </div>
          <hr style={{ height: "2px", color: "#3C6DA6" }} />
        </Form>
      </div>
      <div>
        <Button variant="outline-danger" onClick={() => setIsCreate(true)}>
          Créer
        </Button>

        <Table striped>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
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
                              value={userEdit.role}
                              name="role"
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
                            <Form.Control
                              type="text"
                              placeholder="Phone"
                              value={userEdit.phone}
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
                            annuler
                            <TrashFill />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            onClick={handleEditSubmit}
                          >
                            edit
                            <PencilFill />
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={i}>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                        <td>{user.email}</td>
                        <td>{user.birthday}</td>
                        <td>{user.phone}</td>
                        <td>
                          <Button variant="outline-danger">
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
                  ) : (
                    <tr key={i}>
                      <td>{user.lastName}</td>
                      <td>{user.username}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td>{user.birthday}</td>
                      <td>{user.phone}</td>
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
                      placeholder="Nom"
                      value={user.lastName}
                      name="lastName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
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
                  <Form.Select aria-label="Default select example" onChange={handleChange} name="role">
                    <option>Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">Utilisateur</option>
                  </Form.Select>
                  {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="role"
                      value={user.role}
                      name="role"
                      onChange={handleChange}
                    />
                  </Form.Group> */}
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
                <td>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="date"
                      placeholder="Birthday"
                      value={user.birthday}
                      name="birthday"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="number"
                      placeholder="Phone"
                      value={user.phone}
                      name="phone"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => setIsCreate(false)}
                  >
                    annuler
                    <TrashFill />
                  </Button>
                  <Button variant="outline-secondary" onClick={handleCreate}>
                    Creer
                    {/* <AddCircle /> */}
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

/**
 *  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.27.2",
    "@mui/icons-material": "^5.8.0",
    "@mui/material": "^5.8.1",
    "mdbreact": "^5.2.0",
    "material-ui-bootstrap": "^5.2.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.5.0",
    "react-bootstrap-icons": "^1.8.4",
    "react-bootstrap-time-picker": "^2.0.1",
    "react-dom": "^18.2.0",
    "react-native-axios": "^0.17.1",
    "react-router-dom": "^6.4.1",
    "react-scripts": "5.0.1",
    "rsuite": "^5.19.0",
    "sass": "^1.52.1",
    "web-vitals": "^2.1.4"
  },
 */
export default Users;
