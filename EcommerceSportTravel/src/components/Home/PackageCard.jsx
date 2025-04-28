import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PackageCard.css";

const PackageCard = ({ pacchetto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/packages/${pacchetto.id}`);
  };

  return (
    <Card className="h-100 shadow-lg text-light border-0 rounded-4 overflow-hidden" style={{ backgroundColor: "#030805" }}>
      <Card.Img
        variant="top"
        src={pacchetto.immagineUrl}
        alt={pacchetto.nome}
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="text-center fs-5">{pacchetto.titolo}</Card.Title>
        <Card.Text className="text-center mb-3" style={{ fontSize: "0.9rem" }}>
          {pacchetto.partitaDescrizione}
        </Card.Text>
        <Card.Text className="text-center mb-3" style={{ fontSize: "0.9rem" }}>
          {pacchetto.cittaNome}
        </Card.Text>
        <Button
          variant="warning"
          className="mt-auto w-100 fw-bold"
          onClick={handleClick}
        >
          Scopri di più
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;
