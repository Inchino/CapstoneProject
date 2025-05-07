import { useState, useEffect } from "react";
import { Form, Alert, Card, Container, Row, Col } from "react-bootstrap";
import { creaPrenotazione } from "../../services/prenotazioneService";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PackageCard from "../../components/Home/PackageCard";
import { getPacchettoViaggioById } from "../../services/pacchettoViaggioService";
import "./Booking.css";

const Booking = () => {
  const { pacchettoId } = useParams();
  const { state } = useLocation();
  const prezzo = state?.prezzo ?? 0;

  const [numeroPartecipanti, setNumeroPartecipanti] = useState(1);
  const [metodoPagamento, setMetodoPagamento] = useState("Carta di Credito");
  const [statoPrenotazione] = useState("In Attesa");
  const [errore, setErrore] = useState(null);
  const [pacchetto, setPacchetto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacchetto = async () => {
      try {
        const data = await getPacchettoViaggioById(pacchettoId);
        setPacchetto(data);
      } catch (err) {
        console.error("Errore nel caricamento del pacchetto.", err);
      }
    };

    fetchPacchetto();
  }, [pacchettoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setErrore("Utente non autenticato.");
      return;
    }

    const dto = {
      pacchettoViaggioId: pacchettoId,
      prezzoPagato: prezzo * numeroPartecipanti,
      numeroPartecipanti,
      metodoPagamento,
      statoPrenotazione,
    };

    try {
      await creaPrenotazione(dto, token);
      navigate("/userBookings");
    } catch (err) {
      const message = err?.message || "Errore nella prenotazione.";
      setErrore(message);
    }
  };

  return (
    <Container>
      <section className="py-5 mb-5 mt-5 rounded-4 shadow booking-section">
        <Container>
          <h2 className="text-center mb-5 booking-title text-warning">Prenota il tuo pacchetto</h2>
          {errore && <Alert variant="danger">{errore}</Alert>}

          {pacchetto && (
            <Row className="g-4">
              <Col md={6}>
              <PackageCard pacchetto={pacchetto} buttonLabel="Torna al dettaglio" />
              </Col>

              <Col md={6}>
                <Card className="border-0 rounded-4 p-4" style={{ backgroundColor: "#030805" }}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: "#fdf6e3" }}>Numero Partecipanti</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        max={10}
                        value={numeroPartecipanti}
                        onChange={(e) =>
                          setNumeroPartecipanti(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        style={{ color: "#fdf6e3", backgroundColor: "#000", borderColor: "#d4af37" }}
                      />
                    </Form.Group>

                    <div className="fs-5 text-center mb-4" style={{ color: "#fdf6e3" }}>
                      Prezzo totale: <strong>€{(prezzo * numeroPartecipanti).toFixed(2)}</strong>
                    </div>

                    <Form.Group className="mb-4">
                      <Form.Label style={{ color: "#fdf6e3" }}>Metodo di Pagamento</Form.Label>
                      <Form.Select
                        value={metodoPagamento}
                        onChange={(e) => setMetodoPagamento(e.target.value)}
                        style={{ color: "#fdf6e3", backgroundColor: "#000", borderColor: "#d4af37" }}
                      >
                        <option>Carta di Credito</option>
                        <option>PayPal</option>
                        <option>Bonifico Bancario</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="text-center">
                      <button type="submit" className="gold-btn">
                        <span>Prenota</span>
                      </button>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Container>
  );
};

export default Booking;
