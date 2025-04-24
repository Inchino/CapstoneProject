import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminPackageList from "../../components/Admin/AdminPackageList";
import AdminPackageEditModal from "../../components/Admin/AdminPackageEditModal";
import { updatePacchettoViaggio, getPacchettoViaggioById } from "../../services/pacchettoViaggioService";

const AdminPackages = () => {
  const [selectedPacchetto, setSelectedPacchetto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = async (pacchetto) => {
    try {
      const pacchettoCompleto = await getPacchettoViaggioById(pacchetto.id); // ⬅️ Nuova chiamata
      setSelectedPacchetto(pacchettoCompleto);
      setShowModal(true);
    } catch (err) {
      console.error("Errore nel recupero dettagli pacchetto", err);
      alert("Errore nel recupero dei dettagli del pacchetto.");
    }
  };

  const handleDelete = (id) => {
    console.log("Elimina pacchetto con id:", id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPacchetto(null);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
      await updatePacchettoViaggio(updatedData);
      setShowModal(false);
      setSelectedPacchetto(null);
      setRefreshKey((prev) => prev + 1); // forza il re-render della lista
    } catch (error) {
      alert("Errore nel salvataggio delle modifiche.");
      console.error(error);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="mb-4">Gestione Pacchetti Viaggio</h1>
        </Col>
      </Row>

      <AdminPackageList
        key={refreshKey}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {selectedPacchetto && (
        <AdminPackageEditModal
          show={showModal}
          handleClose={handleCloseModal}
          pacchetto={selectedPacchetto}
          onSave={handleSaveChanges}
        />
      )}
    </Container>
  );
};

export default AdminPackages;
