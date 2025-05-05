import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./MyFooter.css";

function MyFooter() {
  return (
    <footer className="footer-custom text-light pt-5 pb-3">
      <Container>
        <Row className="text-center text-md-start align-items-start">
          <Col md={4} className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <Image
                src="/GoalAwayLogo.png"
                alt="GoalAway Logo"
                height="40"
                className="me-2"
              />
              <h5 className="footer-brand m-0">GoalAway</h5>
            </div>
            <p className="desc">
              Vivi la passione del calcio italiano visitando città e stadi unici
              con pacchetti su misura.
            </p>
          </Col>

          <Col md={4} className="mb-4">
            <h6 className="section-title">Link utili</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/packages" className="footer-link">
                  Pacchetti
                </Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="footer-link">
                  Registrati
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h6 className="section-title">Newsletter</h6>
            <Form className="newsletter-form">
              <Form.Control
                type="email"
                placeholder="La tua email"
                className="mb-2"
              />
              <button type="submit" className="newsletter-btn">
                <span>Iscriviti</span>
              </button>
            </Form>
            <div className="social-icons mt-3">
              <a href="#" className="footer-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="footer-icon ms-3">
                <FaInstagram />
              </a>
              <a href="#" className="footer-icon ms-3">
                <FaTwitter />
              </a>
            </div>
          </Col>
        </Row>

        <hr className="border-light" />
        <p className="text-center small m-0">
          © 2025 GoalAway. Tutti i diritti riservati.
        </p>
      </Container>
    </footer>
  );
}

export default MyFooter;
