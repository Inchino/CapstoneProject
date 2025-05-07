import { useState } from "react";
import { Form, Alert, Card, Container } from "react-bootstrap";
import { creaPrenotazione } from "../../services/prenotazioneService";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./Booking.css";

const Booking = () => {
  const { pacchettoId } = useParams();
  const { state } = useLocation();
  const prezzo = state?.prezzo ?? 0;

  const [numeroPartecipanti, setNumeroPartecipanti] = useState(1);
  const [metodoPagamento, setMetodoPagamento] = useState("Carta di Credito");
  const [statoPrenotazione] = useState("In Attesa");
  const [errore, setErrore] = useState(null);
  const navigate = useNavigate();

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
        <Container className="d-flex justify-content-center">
          <div style={{ maxWidth: "600px", width: "100%" }}>
            <h2 className="text-center mb-4 booking-title">
              Prenota il tuo pacchetto
            </h2>
            {errore && <Alert variant="danger">{errore}</Alert>}

            <Card
              className="border-0 rounded-4 p-4"
              style={{ backgroundColor: "#030805" }}
            >
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-crema">
                    Numero Partecipanti
                  </Form.Label>
                  <Form.Control
                    className="form-crema"
                    type="number"
                    min={1}
                    max={10}
                    value={numeroPartecipanti}
                    onChange={(e) =>
                      setNumeroPartecipanti(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                  />
                </Form.Group>

                <div className="fs-5 text-center mb-4 text-crema">
                  Prezzo totale:{" "}
                  <strong>€{(prezzo * numeroPartecipanti).toFixed(2)}</strong>
                </div>

                <Form.Group className="mb-4">
                  <Form.Label className="text-crema">
                    Metodo di Pagamento
                  </Form.Label>
                  <Form.Select
                    className="form-crema"
                    value={metodoPagamento}
                    style={{ backgroundColor: "#030805" }}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                  >
                    <option>Carta di Credito</option>
                    <option>PayPal</option>
                    <option>Bonifico Bancario</option>
                  </Form.Select>
                </Form.Group>

                <div className="text-center">
                  <button type="submit" className="gold-btn">
                    <span>Prenota ora</span>
                  </button>
                </div>
              </Form>
            </Card>
          </div>
        </Container>
      </section>
    </Container>
  );
};

export default Booking;
