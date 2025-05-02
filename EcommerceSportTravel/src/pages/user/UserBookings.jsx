import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";
import { getMiePrenotazioni } from "../../services/prenotazioneService";

const UserBookings = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [errore, setErrore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrore("Utente non autenticato.");
          setLoading(false);
          return;
        }

        const data = await getMiePrenotazioni(token);
        setPrenotazioni(data);
      } catch (err) {
        setErrore(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrenotazioni();
  }, []);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (errore) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{errore}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Le mie prenotazioni</h2>
      {prenotazioni.length === 0 ? (
        <Alert variant="info">Nessuna prenotazione trovata.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Data</th>
              <th>Città</th>
              <th>Pacchetto</th>
              <th>Partecipanti</th>
              <th>Prezzo</th>
              <th>Metodo Pagamento</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {prenotazioni.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.dataPrenotazione).toLocaleDateString()}</td>
                <td>{p.cittaNome}</td>
                <td>{p.titoloPacchetto}</td>
                <td>{p.numeroPartecipanti}</td>
                <td>€{p.prezzoPagato.toFixed(2)}</td>
                <td>{p.metodoPagamento}</td>
                <td>{p.statoPrenotazione}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserBookings;
