import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Button } from "react-bootstrap";
import { getCittaById } from "../services/cittaService";
import { getSquadraById } from "../services/squadraService";
import { getPacchettiBySquadraId } from "../services/pacchettoViaggioService";
import PackageCard from "../components/Home/PackageCard";
import "./TeamDetail.css";

const TeamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [squadra, setSquadra] = useState(null);
  const [citta, setCitta] = useState(null);
  const [pacchetti, setPacchetti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrore(null);

        const squadraData = await getSquadraById(id);
        setSquadra(squadraData);

        if (squadraData?.cittaId) {
          const cittaData = await getCittaById(squadraData.cittaId);
          setCitta(cittaData);
        }

        const pacchettiData = await getPacchettiBySquadraId(id);
        setPacchetti(pacchettiData);
      } catch (err) {
        console.error("[TeamDetail] Errore nel caricamento:", err);
        setErrore("Errore durante il caricamento dei dati.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5 text-light">
        <Spinner animation="border" variant="light" />
        <p className="mt-3">Caricamento contenuti...</p>
      </div>
    );
  }

  if (errore) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{errore}</Alert>
      </Container>
    );
  }

  return (
    <>
      {citta && (
        <div
          className="team-banner"
          style={{ backgroundImage: `url(${citta.immagineUrl})` }}
        >
          <div className="team-banner-overlay">
            <h1 className="team-banner-title">
              {squadra?.nome} - {citta.nome}
            </h1>
          </div>
        </div>
      )}

      <Container>
        <section className="team-pacchetti-section py-5">
          <Container
            className="rounded-4 shadow p-4"
            style={{ backgroundColor: "#05391F" }}
          >
            <h2 className="text-center text-warning mb-4">
              Pacchetti disponibili
            </h2>
            {pacchetti.length === 0 ? (
              <p className="text-center text-light">
                Al momento non ci sono pacchetti disponibili per questa squadra.
                Torna presto!
              </p>
            ) : (
              <Row>
                {pacchetti.map((p) => (
                  <Col key={p.id} xs={12} md={6} lg={4} className="mb-4">
                    <PackageCard pacchetto={p} />
                  </Col>
                ))}
              </Row>
            )}
            <div className="text-center mt-4">
              <Button
                variant="warning"
                className="gold-btn"
                onClick={() => navigate("/packages")}
              >
                <span>Esplora tutti i pacchetti</span>
              </Button>
            </div>
          </Container>
        </section>
      </Container>
    </>
  );
};

export default TeamDetail;
