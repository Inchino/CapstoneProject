import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { getPacchettoViaggioById } from "../services/pacchettoViaggioService";

const PackageDetail = () => {
  const { id } = useParams();
  const [pacchetto, setPacchetto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacchetto = async () => {
      try {
        const data = await getPacchettoViaggioById(id);
        setPacchetto(data);
        setLoading(false);
      } catch (err) {
        setError("Errore nel caricamento del pacchetto.");
        setLoading(false);
      }
    };

    fetchPacchetto();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <p className="text-center text-danger">{error}</p>
      </Container>
    );
  }

  const handlePrenota = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/booking/${pacchetto.id}`, {
        state: {
          prezzo: pacchetto.prezzo,
        },
      });
    }
  };

  return (
    <Container>
      <section
        className="py-5 mb-5 mt-5 rounded-4 shadow"
        style={{ backgroundColor: "#1b3a2f" }}
      >
        <Container className="d-flex justify-content-center">
          <div style={{ maxWidth: "1100px", width: "100%" }}>
            <h2 className="text-center text-light mb-4">Dettagli Pacchetto</h2>
            <Card className="shadow-lg rounded-4 border-0 bg-dark text-light overflow-hidden">
              <Row className="g-0">
                <Col md={6}>
                  <Card.Img
                    src={pacchetto.immagineUrl}
                    alt={pacchetto.titolo}
                    className="h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
                <Col
                  md={6}
                  className="d-flex flex-column justify-content-center p-4 rounded-end-4"
                >
                  <Card.Body>
                    <Card.Title className="fs-2">{pacchetto.titolo}</Card.Title>
                    <Card.Text className="mb-2">
                      <strong>Città:</strong> {pacchetto.cittaNome}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Partita:</strong> {pacchetto.partitaDescrizione}
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong>Durata:</strong> {pacchetto.durata} giorni
                    </Card.Text>
                    <Card.Text className="text-warning mb-4 fs-5">
                      <strong>Prezzo:</strong> €{pacchetto.prezzo.toFixed(2)}
                    </Card.Text>
                    <Card.Text className="mb-4">
                      {pacchetto.descrizione}
                    </Card.Text>
                    <Button
                      variant="warning"
                      size="lg"
                      className="fw-bold"
                      onClick={handlePrenota}
                    >
                      Prenota ora
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </Container>
      </section>
    </Container>
  );
};

export default PackageDetail;
