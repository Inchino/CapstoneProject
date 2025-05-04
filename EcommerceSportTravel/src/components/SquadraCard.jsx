import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SquadraCard.css';

export default function SquadraCard({ id, nome, coloreMaglia, logoUrl }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${id}`);
  };

  return (
    <Card
      className="squadra-card"
      style={{ backgroundColor: coloreMaglia, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Card.Body className="text-center">
        <img src={logoUrl} alt={nome} className="logo-img" />
        <Card.Title className="mt-2 text-white">{nome}</Card.Title>
      </Card.Body>
    </Card>
  );
}
