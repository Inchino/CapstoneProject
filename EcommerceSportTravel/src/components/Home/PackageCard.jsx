import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./PackageCard.css";

const PackageCard = ({ pacchetto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/packages/${pacchetto.id}`);
  };

  return (
    <Card
      className="package-card h-100 text-light border-0 rounded-4 overflow-hidden"
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={pacchetto.immagineUrl}
        alt={pacchetto.titolo}
        className="package-img"
      />
      <Card.Body className="d-flex flex-column px-3 pb-3 pt-2">
        <Card.Title className="text-center card-title-custom mt-2">
          {pacchetto.titolo}
        </Card.Title>
        <Card.Text className="card-text-custom mb-2">
          <strong>Partita:</strong> {pacchetto.partitaDescrizione}
        </Card.Text>
        <Card.Text className="card-text-custom mb-3">
          <strong>Città:</strong> {pacchetto.cittaNome}
        </Card.Text>
        <button type="button" className="newsletter-btn mt-auto mb-3">
          <span>Scopri di più</span>
        </button>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;
