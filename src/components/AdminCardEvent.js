// import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import EditEvent from "../pages/EditEvent";
import {  useState } from "react";
// import { useEffect, useState } from "react";
import "../styles/styles.scss";
// import ReservationService from "../services/reservation.service";
import EventService from "../services/event.service";

const AdminCardEvent = (props) => {
  const [formData, setFormData] = useState(props.data);
  const [modalShow, setModalShow] = useState(false);

  const style = {
    width: "60%",
  };

  const deleteEvent = (id) => {
    EventService.deleteEvent(id);
    let filter = props.datas.filter(function (e) {
      return e.id !== id;
    });
    props.setdatas(filter);
  };

  const updateEvent = (id) => {
    EventService.editEvent(id, formData)
      .then((res) => {
        props.getallEvent();
      });
    setModalShow(false);
    // window.location.reload();
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
              datavalue={formData}
              show={modalShow}
              onHide={() => setModalShow(false)}
              // setFormData={setFormData}
              setvalue={setFormData}
              update={updateEvent}
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