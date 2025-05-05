import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./BestPackageSection.css";

const BestPackageSection = ({ pacchetto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/packages/${pacchetto.id}`);
  };

  return (
    <section className="py-5 mb-5 rounded-4 shadow" style={{ backgroundColor: "#05391F" }}>
      <Container className="d-flex justify-content-center">
        <div style={{ maxWidth: "1100px", width: "100%" }}>
          <h2 className="text-center best-title mb-5">
            Il Miglior Pacchetto del Giorno
          </h2>
          <Card className="bg-dark border-0 shadow rounded-4 best-package-card text-light">
            <Row className="g-0 flex-column flex-md-row">
              <Col md={6}>
                <div className="position-relative h-100">
                  <Card.Img
                    src={pacchetto.immagineUrl}
                    alt={pacchetto.titolo}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "1rem 0 0 1rem"
                    }}
                  />
                  <Badge className="position-absolute top-0 start-0 m-3 pulse-badge">
                    Top
                  </Badge>
                </div>
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center p-4 rounded-end-4" style={{ backgroundColor: "#030805" }}>
                <Card.Body className="text-start">
                  <Card.Title className="fs-3 mb-4 text-center">{pacchetto.titolo}</Card.Title>
                  <Card.Text className="mb-3">
                    <strong>Città:</strong> {pacchetto.cittaNome}<br />
                    <strong>Partita:</strong> {pacchetto.partitaDescrizione}<br />
                    <strong>Durata:</strong> {pacchetto.durata} giorni<br />
                    <strong>Prezzo:</strong> €{pacchetto.prezzo.toFixed(2)}
                  </Card.Text>
                  <Card.Text className="mb-4 text-center">
                    {pacchetto.descrizione}
                  </Card.Text>
                  <button
                    type="button"
                    className="newsletter-btn"
                    onClick={handleClick}
                  >
                    <span>Scopri di più</span>
                  </button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default BestPackageSection;
