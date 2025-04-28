import { useEffect, useState } from "react";
import HeroSection from "../components/Home/HeroSection";
import SearchBar from "../components/Home/SearchBar";
import BestPackageSection from "../components/Home/BestPackageSection";

import { getPacchettoViaggioById } from "../services/pacchettoViaggioService"

function Home() {
  const [bestPackage, setBestPackage] = useState(null);

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

    fetchBestPackage();
  }, []);

  return (
    <>
      <HeroSection />
      <SearchBar />
      {bestPackage && <BestPackageSection pacchetto={bestPackage} />}
    </>
  );
}

export default Home;
