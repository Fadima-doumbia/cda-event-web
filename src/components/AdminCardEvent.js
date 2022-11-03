// import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditEvent from "../pages/EditEvent";
import {  useState } from "react";
// import { useEffect, useState } from "react";
import "../styles/styles.scss";
import ReservationService from "../services/reservation.service";
import EventService from "../services/event.service";

const AdminCardEvent = (props) => {
  const [formData, setFormData] = useState(props.data);
  // const [data, setData] = useState();
  // const [eventData, setEventData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  // let userToken = "";
  // const [datas, setDatas] = useState([]);

  // useEffect(() => {
  //   getToken();
  // }, []);

  // const getToken = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   userToken = user.accessToken;
  // };

  const style = {
    width: "60%",
  };

  const deleteEvent = (id) => {
    // getToken();
    // axios.delete(`http://localhost:8080/api/admin/events/${id}`, {
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //   },
    // });
    ReservationService.annulerReservation(id);
    let filter = props.datas.filter(function (e) {
      return e.id !== id;
    });
    props.setdatas(filter);
    // console.log(filter);
  };

  const updateEvent = (formdata) => {
    // getToken();
    // axios
    //   .put(`http://localhost:8080/api/admin/events/${formdata.id}`, formdata, {
    //     headers: {
    //       Authorization: `Bearer ${userToken}`,
    //     },
    //   })
    EventService.editEvent(formdata.id)
      .then((res) => {
        props.getallEvent();
      });
    setModalShow(false);
    window.location.reload();
  };


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