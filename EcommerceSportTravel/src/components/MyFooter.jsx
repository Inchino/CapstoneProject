import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MyFooter.css';

function MyFooter() {
  return (
    <footer className="footer-custom text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3">
            <h5 className="brand">CALCIO E VIAGGI</h5>
            <p className="desc">
              Pacchetti viaggio che includono il biglietto per la partita di calcio della squadra locale.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="section-title">Link Rapidi</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/packages" className="footer-link">Pacchetti</Link></li>
              <li><Link to="/login" className="footer-link">Login</Link></li>
              <li><Link to="/signup" className="footer-link">Registrazione</Link></li>
            </ul>
          </Col>

          <Col md={4} className="mb-3">
            <h6 className="section-title">Contatti</h6>
            <p className="footer-link">📧 info@calcioeviaggi.it</p>
            <p className="footer-link">📞 +39 012 3456789</p>
            <p className="footer-link">📘 Facebook &nbsp; 📸 Instagram</p>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center small m-0">© 2024 Calcio e Viaggi</p>
      </Container>
    </footer>
  );
}

export default MyFooter;
