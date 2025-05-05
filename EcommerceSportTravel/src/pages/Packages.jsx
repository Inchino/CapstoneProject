import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import PackageCard from "../components/Home/PackageCard";
import "./Packages.css";
import { getPacchettiViaggio } from "../services/pacchettoViaggioService";

function Packages() {
  const [pacchettiDisponibili, setPacchettiDisponibili] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacchettiDisponibili = async () => {
      try {
        const data = await getPacchettiViaggio();
        setPacchettiDisponibili(data.data || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacchettiDisponibili();
  }, []);

  return (
    <Container className="mt-5 px-3">
      <section className="py-5 mb-5 rounded-4 shadow packages-section">
        <Container>
          <h2 className="text-center packages-title mb-4">Pacchetti Viaggio</h2>
          <p className="text-center packages-subtitle mb-5">
            Vivi la tua passione per il calcio visitando città incredibili:
            scegli il tuo viaggio ideale!
          </p>

          {loading ? (
            <div className="loader-container">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <Row>
              {pacchettiDisponibili.length > 0 ? (
                pacchettiDisponibili.map((pacchetto) => (
                  <Col key={pacchetto.id} xs={12} md={6} lg={4} className="mb-4">
                    <PackageCard pacchetto={pacchetto} />
                  </Col>
                ))
              ) : (
                <Col>
                  <p className="text-center text-light">
                    Nessun pacchetto disponibile al momento.
                  </p>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>
    </Container>
  );
}

export default Packages;
