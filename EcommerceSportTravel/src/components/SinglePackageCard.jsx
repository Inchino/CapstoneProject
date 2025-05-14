import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SinglePackageCard = ({ pacchetto, onEdit, onDelete }) => {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={pacchetto.immagineUrl}
        alt={pacchetto.titolo}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{pacchetto.titolo}</Card.Title>
        <Card.Text className="text-black"><em>{pacchetto.descrizione}</em></Card.Text>
        <Card.Text className="text-black">
          <strong>Partita:</strong> {pacchetto.partitaDescrizione}<br />
          <strong>Città:</strong> {pacchetto.cittaNome}<br />
          <strong>Durata:</strong> {pacchetto.durataInGiorni} giorni<br />
          <strong>Disponibile:</strong> {pacchetto.disponibile ? "Sì" : "No"}<br />
          <strong>Prezzo:</strong> € {pacchetto.prezzo.toFixed(2)}
        </Card.Text>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="outline-primary m-1" onClick={() => onEdit(pacchetto)}>
            Modifica
          </Button>
          <Button variant="danger m-1" onClick={() => onDelete(pacchetto.id)}>
            Elimina
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SinglePackageCard;
