import { useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import SquadraCard from './SquadraCard';
import { getAllSquadre } from '../services/squadraService';
import './SquadreCarousel.css';

export default function SquadreCarousel() {
  const [squadre, setSquadre] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllSquadre(0, 100);
      console.log("Squadre ricevute:", data);
      setSquadre(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  if (loading) {
    return <div className="text-center my-4"><Spinner animation="border" /></div>;
  }

  return (
    <div className="position-relative mb-4">
      <button className="scroll-btn left" onClick={() => scroll(-300)}>{'<'}</button>
      <div className="squadre-container" ref={scrollRef}>
        {squadre.map((squadra) => (
          <SquadraCard
            key={squadra.id}
            id={squadra.id}
            nome={squadra.nome}
            logoUrl={squadra.logoUrl}
            coloreMaglia={squadra.coloreMaglia || '#222'}
          />
        ))}
      </div>
      <button className="scroll-btn right" onClick={() => scroll(300)}>{'>'}</button>
    </div>
  );
}
