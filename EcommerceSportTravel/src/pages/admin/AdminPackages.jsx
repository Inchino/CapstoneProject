import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import AdminPackageList from "../../components/Admin/AdminPackageList";
import AdminPackageEditModal from "../../components/Admin/AdminPackageEditModal";
import {
  createPacchettoViaggio,
  updatePacchettoViaggio,
  getPacchettoViaggioById,
  deletePacchettoViaggio,
} from "../../services/pacchettoViaggioService";

import { getPartite } from "../../services/partitaService";

const AdminPackages = () => {
  const [selectedPacchetto, setSelectedPacchetto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [partite, setPartite] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    bg: "success",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partiteData = await getPartite();
        setPartite(partiteData);
      } catch (error) {
        showToast("Errore nel caricamento delle Partite", "danger");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = async (pacchetto) => {
    try {
      const pacchettoCompleto = await getPacchettoViaggioById(pacchetto.id);
      setSelectedPacchetto(pacchettoCompleto);
      setIsCreating(false);
      setShowModal(true);
    } catch (err) {
      showToast("Errore nel caricamento dei dettagli del pacchetto", "danger");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare questo pacchetto?"
    );
    if (!conferma) return;

    try {
      await deletePacchettoViaggio(id);
      setRefreshKey((prev) => prev + 1);
      showToast("Pacchetto eliminato con successo!", "success");
    } catch (error) {
      showToast("Errore durante l'eliminazione del pacchetto", "danger");
      console.error(error);
    }
  };

  const handleCreateClick = () => {
    setSelectedPacchetto({
      titolo: "",
      descrizione: "",
      prezzo: 0,
      durata: "",
      immagineUrl: "",
      disponibile: true,
      partitaId: "",
      cittaId: "",
    });
    setIsCreating(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPacchetto(null);
    setIsCreating(false);
  };

  const handleSaveChanges = async (data) => {
    try {
      if (isCreating) {
        const { id, ...createData } = data;
        await createPacchettoViaggio(createData);
        showToast("Pacchetto creato con successo!", "success");
      } else {
        await updatePacchettoViaggio(data);
        showToast("Pacchetto aggiornato con successo!", "success");
      }

      setShowModal(false);
      setSelectedPacchetto(null);
      setIsCreating(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      showToast("Errore durante il salvataggio dei dati", "danger");
      console.error(error);
    }
  };

  const showToast = (message, bg = "success") => {
    setToast({ show: true, message, bg });
    setTimeout(() => {
      setToast({ show: false, message: "", bg: "success" });
    }, 3000);
  };

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h1>Gestione Pacchetti Viaggio</h1>
          <Button variant="success" onClick={handleCreateClick}>
            + Aggiungi Pacchetto
          </Button>
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
          partite={partite}
        />
      )}

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={toast.show}
          bg={toast.bg}
          onClose={() => setToast({ ...toast, show: false })}
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AdminPackages;