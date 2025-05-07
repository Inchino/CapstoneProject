import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SquadraCard.css';

export default function SquadraCard({ id, nome, logoUrl }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/team/${id}`);
  };

  return (
    <Card
      className="squadra-card"
      style={{ backgroundColor: '#030805', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Card.Body className="text-center">
        <img src={logoUrl} alt={nome} className="logo-img" />
        <Card.Title className="mt-2 text-cream">{nome}</Card.Title>
      </Card.Body>
    </Card>
  );
}
