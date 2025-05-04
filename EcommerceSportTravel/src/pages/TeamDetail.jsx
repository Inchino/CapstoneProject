import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Spinner, Alert } from "react-bootstrap";
import { getSquadraById } from "../services/squadraService";
import { getCittaById } from "../services/cittaService";
import { getPacchettiBySquadraId } from "../services/pacchettoViaggioService";
import PackageCard from "../components/Home/PackageCard";

export default function TeamDetail() {
  const { id } = useParams();
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
      <div className="text-center my-5">
        <Spinner animation="border" />
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
      {/* Banner città */}
      {citta && (
        <div
          style={{
            backgroundImage: `url(${citta.immagineUrl})`,
            height: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
            }}
          >
            <h1>
              {squadra?.nome} - {citta.nome}
            </h1>
          </div>
        </div>
      )}

      {/* Sezione pacchetti */}
      <Container className="mt-5">
        <h2 className="mb-4">Pacchetti disponibili</h2>
        {pacchetti.length === 0 ? (
          <p>Nessun pacchetto disponibile per questa squadra.</p>
        ) : (
          <Row className="d-flex flex-wrap gap-3 justify-content-center">
            {pacchetti.map((p) => (
              <PackageCard key={p.id} pacchetto={p} />
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
