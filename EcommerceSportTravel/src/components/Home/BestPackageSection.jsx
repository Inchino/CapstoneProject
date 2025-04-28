import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";

const BestPackageSection = ({ pacchetto }) => {
  return (
    <section className="py-5" style={{ backgroundColor: "#0e1a15" }}>
      <Container>
        <h2 className="text-center text-light mb-5">Pacchetto Migliore del Giorno</h2>
        <Card className="bg-dark text-light border-0 shadow-lg">
          <Row className="g-0">
            <Col md={6}>
              <div className="position-relative h-100">
                <Card.Img
                  src={pacchetto.immagineUrl}
                  alt={pacchetto.nome}
                  style={{ height: "100%", objectFit: "cover", borderRadius: "0.5rem 0 0 0.5rem" }}
                />
                {/* Badge "Top" sopra l'immagine */}
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
            <Col md={6} className="d-flex flex-column justify-content-center p-4">
              <Card.Body>
                <Card.Title className="fs-3 mb-4">{pacchetto.nome}</Card.Title>
                <Card.Text className="text-secondary mb-3">
                  <strong>Città:</strong> {pacchetto.cittaNome}<br />
                  <strong>Partita:</strong> {pacchetto.partitaDescrizione}<br />
                  <strong>Durata:</strong> {pacchetto.durata} giorni<br />
                  <strong>Prezzo:</strong> €{pacchetto.prezzo.toFixed(2)}
                </Card.Text>
                <Card.Text className="mb-4">
                  {pacchetto.descrizione}
                </Card.Text>
                <Button variant="warning" className="w-50">
                  Scopri di più
                </Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </section>
  );
};

export default BestPackageSection;
