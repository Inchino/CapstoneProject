import { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Badge, Row, Col, Card } from "react-bootstrap";
import { getMiePrenotazioni } from "../../services/prenotazioneService";
import { BiCalendar, BiMap, BiUser } from "react-icons/bi";
import "./UserBooking.css";

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

  const getBadgeColor = (stato) => {
    switch (stato) {
      case "In Attesa":
        return "warning";
      case "Confermata":
        return "success";
      case "Annullata":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container className="user-bookings-section mt-5 mb-5">
      <h2 className="text-center user-bookings-title mb-2">
        Le mie prenotazioni
      </h2>
      <p className="text-center user-bookings-subtitle mb-4">
        Storico delle tue esperienze calcistiche tra sport e cultura.
      </p>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="light" />
          <p className="loader-text">Caricamento delle prenotazioni...</p>
        </div>
      ) : errore ? (
        <Alert variant="danger">{errore}</Alert>
      ) : prenotazioni.length === 0 ? (
        <Alert variant="info" className="text-center">
          Nessuna prenotazione trovata. Inizia la tua avventura visitando la
          sezione Pacchetti!
        </Alert>
      ) : (
        <>
          {/* Desktop view */}
          <div className="d-none d-md-block">
            <Table
              striped
              bordered
              hover
              responsive
              className="user-bookings-table"
            >
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Città</th>
                  <th scope="col">Pacchetto</th>
                  <th scope="col">Partecipanti</th>
                  <th scope="col">Prezzo</th>
                  <th scope="col">Pagamento</th>
                  <th scope="col">Stato</th>
                </tr>
              </thead>
              <tbody>
                {prenotazioni.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {new Date(p.dataPrenotazione).toLocaleDateString("it-IT", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{p.cittaNome}</td>
                    <td>{p.titoloPacchetto}</td>
                    <td>{p.numeroPartecipanti}</td>
                    <td>€{p.prezzoPagato.toFixed(2)}</td>
                    <td>{p.metodoPagamento}</td>
                    <td>
                      <Badge
                        bg={getBadgeColor(p.statoPrenotazione)}
                        className="user-bookings-badge"
                      >
                        {p.statoPrenotazione}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Mobile view */}
          <div className="d-md-none">
            <Row>
              {prenotazioni.map((p) => (
                <Col xs={12} key={p.id} className="mb-4">
                  <Card className="user-bookings-card shadow">
                    <Card.Body>
                      <Card.Title className="user-bookings-card-title">
                        {p.titoloPacchetto}
                      </Card.Title>
                      <Card.Text>
                        <BiCalendar />{" "}
                        {new Date(p.dataPrenotazione).toLocaleDateString("it-IT", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </Card.Text>
                      <Card.Text>
                        <BiMap /> {p.cittaNome}
                      </Card.Text>
                      <Card.Text>
                        <BiUser /> {p.numeroPartecipanti} partecipante
                        {p.numeroPartecipanti > 1 ? "i" : ""}
                      </Card.Text>
                      <Card.Text>
                        Prezzo: <strong>€{p.prezzoPagato.toFixed(2)}</strong>
                      </Card.Text>
                      <Card.Text>Pagamento: {p.metodoPagamento}</Card.Text>
                      <Card.Text>
                        Stato:{" "}
                        <Badge
                          bg={getBadgeColor(p.statoPrenotazione)}
                          className="user-bookings-badge"
                        >
                          {p.statoPrenotazione}
                        </Badge>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </>
      )}
    </Container>
  );
};

export default UserBookings;
