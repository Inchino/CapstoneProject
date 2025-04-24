import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import SinglePackageCard from "../SinglePackageCard";
import { getPacchettiViaggio } from "../../services/pacchettoViaggioService";

const AdminPackageList = ({ onEdit, onDelete }) => {
  const [pacchetti, setPacchetti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPacchettiViaggio();
        setPacchetti(result);
      } catch (err) {
        setError("Errore nel caricamento dei pacchetti viaggio.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento in corso...</p>
      </div>
    );

  if (error)
    return <Alert variant="danger">{error}</Alert>;

  if (pacchetti.length === 0)
    return <Alert variant="info">Nessun pacchetto viaggio disponibile.</Alert>;

  return (
    <Row>
      {pacchetti.map((p) => (
        <Col key={p.id} xs={12} sm={6} lg={4} className="mb-4">
          <SinglePackageCard pacchetto={p} onEdit={onEdit} onDelete={onDelete} />
        </Col>
      ))}
    </Row>
  );
};

export default AdminPackageList;
