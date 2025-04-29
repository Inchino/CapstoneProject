import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import PackageCard from "../components/Home/PackageCard";
import { getPacchettiViaggio } from "../services/pacchettoViaggioService";

function Package() {
  const [pacchettiDisponibili, setPacchettiDisponibili] = useState([]);

  useEffect(() => {
    const fetchPacchettiDisponibili = async () => {
      try {
        const data = await getPacchettiViaggio(); // <-- Parentesi aggiunte!
        console.log("Pacchetti ricevuti:", data);
        setPacchettiDisponibili(data.data || data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPacchettiDisponibili();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <h1 className="text-center text-light mb-4">Pacchetti Viaggio</h1>
        <p className="text-center text-light mb-5">
          Vivi la tua passione per il calcio visitando città incredibili:
          scegli il tuo viaggio ideale!
        </p>
      </Container>
      <Container>
      <section
        className="py-5 mb-5 rounded-4 shadow"
        style={{ backgroundColor: "#1b3a2f" }}
      >
        <Container>
          <Row>
            {pacchettiDisponibili.length > 0 ? (
              pacchettiDisponibili.map((pacchetto) => (
                <Col key={pacchetto.id} xs={12} md={6} lg={4} className="mb-4">
                  <PackageCard pacchetto={pacchetto} />
                </Col>
              ))
            ) : (
              <p className="text-center text-light">
                Nessun pacchetto disponibile al momento.
              </p>
            )}
          </Row>
        </Container>
      </section>
      </Container>
    </>
  );
}

export default Package;
