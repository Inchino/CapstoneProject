import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/Home/HeroSection";
import BestPackageSection from "../components/Home/BestPackageSection";
import PackageCard from "../components/Home/PackageCard";
import SquadreCarousel from "../components/SquadreCarousel";
import "./Home.css";

import {
  getPacchettoViaggioById,
  getPacchettiViaggio,
} from "../services/pacchettoViaggioService";

function Home() {
  const [bestPackage, setBestPackage] = useState(null);
  const [pacchettiDisponibili, setPacchettiDisponibili] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const ID_PACCHETTO_DEL_GIORNO = "324A29BC-9EFD-4A13-BA01-59EC412C9896";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [best, lista] = await Promise.all([
          getPacchettoViaggioById(ID_PACCHETTO_DEL_GIORNO),
          getPacchettiViaggio(0, 6),
        ]);
        setBestPackage(best);
        setPacchettiDisponibili(lista.data || lista);
      } catch (error) {
        console.error("Errore nel caricamento dei pacchetti:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Spinner animation="border" role="status" variant="light" />
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <SquadreCarousel />

      <Container className="px-3">
        {bestPackage && <BestPackageSection pacchetto={bestPackage} />}

        <section
          className="py-5 mb-5 rounded-4 shadow"
          style={{ backgroundColor: "#05391F" }}
        >
          <Container>
            <h2 className="text-center mb-3">
              Scopri tutti i pacchetti disponibili
            </h2>
            <p className="text-center mb-5">
              Vivi la tua passione per il calcio visitando città incredibili:
              scegli il tuo viaggio ideale!
            </p>

            <Row>
              {pacchettiDisponibili.length > 0 ? (
                pacchettiDisponibili.map((pacchetto) => (
                  <Col
                    key={pacchetto.id}
                    xs={12}
                    md={6}
                    lg={4}
                    className="mb-4"
                  >
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

            <div className="text-center mt-4">
              <button
                className="newsletter-btn"
                onClick={() => navigate("/packages")}
              >
                <span>Vedi Altri</span>
              </button>
            </div>
          </Container>
        </section>
      </Container>
    </>
  );
}

export default Home;
