import { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { creaPrenotazione } from "../../services/prenotazioneService";
import { useNavigate, useLocation, useParams } from "react-router-dom";

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
      navigate("/mie-prenotazioni");
    } catch (err) {
      const message = err?.message || "Errore nella prenotazione.";
      setErrore(message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Prenota il tuo pacchetto</h2>
      {errore && <Alert variant="danger">{errore}</Alert>}
      <Form onSubmit={handleSubmit} aria-label="Modulo prenotazione pacchetto">
        <Form.Group controlId="partecipanti" className="mb-3">
          <Form.Label>Numero Partecipanti</Form.Label>
          <Form.Control
            type="number"
            min={1}
            max={10}
            required
            value={numeroPartecipanti}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setNumeroPartecipanti(isNaN(val) ? 1 : val);
            }}
          />
        </Form.Group>

        <Card.Text className="text-info fs-5 mb-3">
          Prezzo totale: <strong>€{(prezzo * numeroPartecipanti).toFixed(2)}</strong>
        </Card.Text>

        <Form.Group controlId="metodoPagamento" className="mb-4">
          <Form.Label>Metodo di Pagamento</Form.Label>
          <Form.Select
            required
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
          >
            <option>Carta di Credito</option>
            <option>PayPal</option>
            <option>Bonifico Bancario</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="fw-bold">
          Prenota ora
        </Button>
      </Form>
    </div>
  );
};

export default Booking;
