import { useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/styles.scss";
import CardDetailsEvent from "./CardDetailsEvent";
import ModalDetailEvent from "./ModalDetailEvent";
import ReservationModal from "./ReservationModal";


const CardEvent = (props) => {
  const formData = props.formData;
  
  return (
    <div >
      <Card
      className="card"
      >
        <Card.Body>
          <Card.Title
            style={{ display: "flex", justifyContent: "space-between" }}
          >
           {formData.name} <span>EAGLE EVENT</span>{" "}
          </Card.Title>
          <hr style={{ backgroundColor: "blue", height: "2px" }} />
          <Card.Text>
            <p style={{ margin: "0" }}>
              Places disponibles :{" "}
              <span style={{ fontSize: "12px" }}> {formData.date} places</span>
            </p>
            <p style={{ margin: "0" }}>
              Adresse :{" "}
              <span style={{ fontSize: "12px" }}> {formData.address} </span>
            </p>
            <p style={{ margin: "0" }}>
              Heure : <span style={{ fontSize: "12px" }}> {formData.heureDebut} - {formData.heureFin}</span>
            </p>
            <p style={{ margin: "0" }}>
              Date : <span style={{ fontSize: "12px" }}> {formData.date} </span>
            </p>
            <p style={{ margin: "0" }}>
              Prix : <span style={{ fontSize: "12px" }}> {formData.prix} </span>
            </p>
          </Card.Text>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CardDetailsEvent id={formData.id} formData={formData} />
            <ReservationModal id={formData.id} event={formData} />
            <ModalDetailEvent id={formData.id} event={formData}/>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default CardEvent;
