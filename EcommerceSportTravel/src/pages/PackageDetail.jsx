import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { getPacchettoViaggioById } from "../services/pacchettoViaggioService";
import "./PackageDetail.css";

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
      } catch (err) {
        setError("Errore nel caricamento del pacchetto.");
      } finally {
        setLoading(false);
      }
    };

    fetchPacchetto();
  }, [id]);

  const handlePrenota = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/booking/${pacchetto.id}`, {
        state: { prezzo: pacchetto.prezzo },
      });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" variant="light" />
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

  return (
    <Container>
      <section
        className="py-5 mb-5 mt-5 rounded-4 shadow"
        style={{ backgroundColor: "#05381E" }}
      >
        <Container className="d-flex justify-content-center">
          <div style={{ maxWidth: "1100px", width: "100%" }}>
            <h2 className="text-center mb-4" style={{ color: "#d4af37" }}>
              Dettagli Pacchetto
            </h2>
            <Card
              className="shadow-lg rounded-4 border-0 text-light overflow-hidden"
              style={{ backgroundColor: "#030805" }}
            >
              <Row className="g-0">
                <Col md={6}>
                  <Card.Img
                    src={pacchetto.immagineUrl}
                    alt={pacchetto.titolo}
                    className="h-100 rounded-start-4"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
                <Col
                  md={6}
                  className="d-flex flex-column justify-content-center p-4 rounded-end-4"
                >
                  <Card.Body>
                    <Card.Title className="fs-2 text-warning text-center mb-3">
                      {pacchetto.titolo}
                    </Card.Title>
                    <Card.Text className="mb-2">
                      <strong style={{ color: "#d4af37" }}>Città:</strong>{" "}
                      <span style={{ color: "#fdf6e3" }}>
                        {pacchetto.cittaNome}
                      </span>
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong style={{ color: "#d4af37" }}>Partita:</strong>{" "}
                      <span style={{ color: "#fdf6e3" }}>
                        {pacchetto.partitaDescrizione}
                      </span>
                    </Card.Text>
                    <Card.Text className="mb-2">
                      <strong style={{ color: "#d4af37" }}>Durata:</strong>{" "}
                      <span style={{ color: "#fdf6e3" }}>
                        {pacchetto.durata} giorni
                      </span>
                    </Card.Text>
                    <Card.Text className="fs-5 mb-4">
                      <strong style={{ color: "#d4af37" }}>Prezzo:</strong>{" "}
                      <span style={{ color: "#fdf6e3" }}>
                        €{pacchetto.prezzo.toFixed(2)}
                      </span>
                    </Card.Text>
                    <Card.Text className="mb-4 text-center" style={{ color: "#fdf6e3" }}>
                      {pacchetto.descrizione}
                    </Card.Text>
                    <button className="gold-btn" onClick={handlePrenota}>
                      <span>Prenota ora</span>
                    </button>
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
