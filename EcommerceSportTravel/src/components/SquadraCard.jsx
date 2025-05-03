import { Card } from 'react-bootstrap';
import './SquadraCard.css';

export default function SquadraCard({ nome, coloreMaglia, logoUrl }) {
  return (
    <Card className="squadra-card" style={{ backgroundColor: coloreMaglia }}>
      <Card.Body className="text-center">
        <img src={logoUrl} alt={nome} className="logo-img" />
        <Card.Title className="mt-2 text-white">{nome}</Card.Title>
      </Card.Body>
    </Card>
  );
}
