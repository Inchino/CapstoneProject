import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section d-flex align-items-center">
      <Container fluid>
        <Row className="justify-content-center text-center text-light">
          <Col lg={8}>
            <h1 className="display-4 fw-bold mb-3">Scopri l’Italia tra calcio e cultura</h1>
            <p className="lead mb-4">
              Viaggi inclusi di biglietto per partite di Serie A nelle città d’arte italiane.
            </p>
            <Button as={Link} to="/packages" variant="light" size="lg" className="me-3">
              Scopri i Pacchetti
            </Button>
            <Button as={Link} to="/signup" variant="outline-light" size="lg">
              Registrati
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
