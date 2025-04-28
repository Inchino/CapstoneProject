import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchBar from "../components/Home/SearchBar";
import BestPackageSection from "../components/Home/BestPackageSection";
import PackageCard from "../components/Home/PackageCard";

import { getPacchettoViaggioById } from "../services/pacchettoViaggioService";
import { getPacchettiViaggio } from "../services/pacchettoViaggioService";

function Home() {
  const [bestPackage, setBestPackage] = useState(null);
  const [pacchettiDisponibili, setPacchettiDisponibili] = useState([]);

  // ID fisso del pacchetto migliore del giorno
  const ID_PACCHETTO_DEL_GIORNO = "CEB43D8C-9069-478D-B4CF-89D5AD8F3DD1";

  useEffect(() => {
    const fetchBestPackage = async () => {
      try {
        const data = await getPacchettoViaggioById(ID_PACCHETTO_DEL_GIORNO);
        setBestPackage(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchPacchettiDisponibili = async () => {
      try {
        const data = await getPacchettiViaggio(0, 6);
        console.log("Pacchetti ricevuti:", data);
        setPacchettiDisponibili(data.data || data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestPackage();
    fetchPacchettiDisponibili();
  }, []);

  return (
    <>
      <HeroSection />
      <SearchBar />
      <Container>
      {bestPackage && <BestPackageSection pacchetto={bestPackage} />}

      <section className="py-5 mb-5 rounded-4 shadow" style={{ backgroundColor: "#1b3a2f" }}>
        <Container>
          <h2 className="text-center text-light mb-4">
            Scopri tutti i pacchetti disponibili
          </h2>
          <p className="text-center text-muted mb-5">
            Vivi la tua passione per il calcio visitando città incredibili:
            scegli il tuo viaggio ideale!
          </p>
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

export default Home;
