import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BestPackageSection = ({ pacchetto }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/packages/${pacchetto.id}`);
  };

  return (
    <section
      className="py-5 mb-5 rounded-4 shadow"
      style={{ backgroundColor: "#1b3a2f" }}
    >
      <Container className="d-flex justify-content-center">
        <div style={{ maxWidth: "1100px", width: "100%" }}>
          <h2 className="text-center text-light mb-5">
            Pacchetto Migliore del Giorno
          </h2>
          <Card className="bg-dark text-light border-0 shadow rounded-4">
            <Row className="g-0">
              <Col md={6}>
                <div className="position-relative h-100">
                  <Card.Img
                    src={pacchetto.immagineUrl}
                    alt={pacchetto.titolo}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "1rem 0 0 1rem",
                    }}
                  />
                  <Badge
                    bg="warning"
                    text="dark"
                    className="position-absolute top-0 start-0 m-3"
                    style={{ fontSize: "1rem" }}
                  >
                    Top
                  </Badge>
                </div>
              </Col>
              <Col
                md={6}
                className="d-flex flex-column justify-content-center p-4 rounded-end-4"
                style={{ backgroundColor: "#030805" }}
              >
                <Card.Body>
                  <Card.Title className="fs-3 mb-4">
                    {pacchetto.nome}
                  </Card.Title>
                  <Card.Text className="text-secondary mb-3">
                    <strong>Città:</strong> {pacchetto.cittaNome}
                    <br />
                    <strong>Partita:</strong> {pacchetto.partitaDescrizione}
                    <br />
                    <strong>Durata:</strong> {pacchetto.durata} giorni
                    <br />
                    <strong>Prezzo:</strong> €{pacchetto.prezzo.toFixed(2)}
                  </Card.Text>
                  <Card.Text className="mb-4">
                    {pacchetto.descrizione}
                  </Card.Text>
                  <Button
                    variant="warning"
                    className="w-50"
                    onClick={handleClick}
                  >
                    Scopri di più
                  </Button>
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
