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
    firstName: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
    reservations: [],
  });
  const [userEdit, setUserEdit] = useState({
    lastName: 0,
    lastName: "",
    firstName: "",
    role: "",
    email: "",
    birthday: new Date(),
    phone: "",
    reservations: [],
  });
  let userToken = '';

  useEffect(() => {
    getAllUseer();
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    userToken=user.accessToken;
    setToken(user.accessToken);
  }, []);

   // return { Authorization: 'Bearer ' + user.accessToken };
  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`
    }};

    const getToken = () =>{
      const user = JSON.parse(localStorage.getItem('user'));
      userToken=user.accessToken;
      setToken(user.accessToken);
    }


  const getAllUseer = async () => {
    getToken();
    // console.log("user token ==> ", userToken, header)
    await axios
      .get("http://localhost:8080/api/events/users/list", {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }})
      .then((res) => {
        console.log(res.data)
        // setDatas(res.data);
        // setArrayUsers(res.data);
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
    // console.log(user.phone.toString())
    axios.post(`http://localhost:8080/api/events/users`, user).then((res) => {
      console.log(res.data);
      setIsCreate(false);
      getAllUseer();
    });
  };
  const handleEdit = (event) => {
    setUserEdit((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(userEdit);
  };
  const handleEditSubmit = () => {
    axios
      .put(`http://localhost:8080/api/events/users/${userEdit.id}`, userEdit)
      .then((res) => {
        console.log(res.data);
        setIsEdit(false);
        getAllUseer();
      });
  };
  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/events/users/${id}`)
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
          console.log("email")
          let filteredemail = arrayUsers.filter((user) =>
            user.email.includes(event.target.value)
          );
          setDatas(filteredemail);
          break;
        case "role":
          console.log("role")
          let filteredrole = arrayUsers.filter((user) =>
            user.role.includes(event.target.value)
          );
          setDatas(filteredrole);
          break;
        case "firstName":
          console.log("firstname")
          let filteredfirstName = arrayUsers.filter((user) =>
            user.firstName.includes(event.target.value)
          );
          setDatas(filteredfirstName);
          break;
        default:
          console.log("lastname")
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
                value={"firstName"}
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
                              value={userEdit.firstName}
                              name="firstName"
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
                        <td>{user.firstName}</td>
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
                      <td>{user.firstName}</td>
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
                      value={user.firstName}
                      name="firstName"
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="role"
                      value={user.role}
                      name="role"
                      onChange={handleChange}
                    />
                  </Form.Group>
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
                    Create
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
