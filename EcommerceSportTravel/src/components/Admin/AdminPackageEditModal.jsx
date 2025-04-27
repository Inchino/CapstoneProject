import { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { getPartitaById } from "../../services/partitaService";

const AdminPackageEditModal = ({
  show,
  handleClose,
  pacchetto,
  onSave,
  partite,
}) => {
  const [formData, setFormData] = useState({ ...pacchetto });
  const [error, setError] = useState("");
  const [isLoadingPartita, setIsLoadingPartita] = useState(false);

  useEffect(() => {
    if (pacchetto) {
      setFormData({
        id: pacchetto.id || "",
        titolo: pacchetto.titolo || "",
        descrizione: pacchetto.descrizione || "",
        prezzo: pacchetto.prezzo || 0,
        durata: pacchetto.durata || "",
        immagineUrl: pacchetto.immagineUrl || "",
        disponibile: pacchetto.disponibile ?? true,
        partitaId: pacchetto.partitaId || "",
        cittaId: pacchetto.cittaId || "",
      });
    } else {
      setFormData({
        id: "",
        titolo: "",
        descrizione: "",
        prezzo: 0,
        durata: "",
        immagineUrl: "",
        disponibile: true,
        partitaId: "",
        cittaId: "",
      });
    }
    setError("");
  }, [pacchetto]);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "partitaId" && value) {
      try {
        setIsLoadingPartita(true);
        const partita = await getPartitaById(value);
        updatedFormData.cittaId = partita.cittaId;
        setError("");
      } catch (err) {
        console.error("Errore nel caricamento della partita", err);
        setError("Errore nel caricamento dei dati della partita. Riprova.");
        updatedFormData.cittaId = "";
      } finally {
        setIsLoadingPartita(false);
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Compila correttamente tutti i campi prima di salvare.");
      return;
    }

    const cleanData = {
      id: formData.id,
      titolo: formData.titolo,
      descrizione: formData.descrizione,
      prezzo: parseFloat(formData.prezzo),
      durata: parseInt(formData.durata),
      immagineUrl: formData.immagineUrl,
      disponibile: formData.disponibile,
      partitaId: formData.partitaId,
      cittaId: formData.cittaId,
    };

    onSave(cleanData);
  };

  const isFormValid = () => {
    return (
      formData.titolo.trim() !== "" &&
      formData.descrizione.trim() !== "" &&
      formData.prezzo >= 200 &&
      formData.durata !== "" &&
      formData.immagineUrl.trim() !== "" &&
      formData.partitaId !== "" &&
      formData.cittaId !== ""
    );
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {formData.id
            ? "Modifica Pacchetto Viaggio"
            : "Nuovo Pacchetto Viaggio"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              name="titolo"
              value={formData.titolo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              name="descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prezzo (€)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="200"
              name="prezzo"
              value={formData.prezzo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Durata (giorni)</Form.Label>
            <Form.Select
              name="durata"
              value={formData.durata}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona durata...</option>
              <option value="3">3 giorni</option>
              <option value="5">5 giorni</option>
              <option value="7">7 giorni</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Immagine (URL)</Form.Label>
            <Form.Control
              type="text"
              name="immagineUrl"
              value={formData.immagineUrl}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Partita</Form.Label>
            <Form.Select
              name="partitaId"
              value={formData.partitaId}
              onChange={handleChange}
              required
              disabled={isLoadingPartita}
            >
              <option value="">Seleziona partita...</option>
              {partite.map((p) => (
                <option key={p.id} value={p.id}>
                  {`${p.squadraCasaNome} vs ${p.squadraOspiteNome} - ${new Date(
                    p.dataPartita
                  ).toLocaleDateString()}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {formData.cittaId && (
            <Form.Group className="mb-3">
              <Form.Label>Città selezionata</Form.Label>
              <Form.Control
                type="text"
                value={
                  partite.find((p) => p.id === formData.partitaId)?.cittaNome ||
                  ""
                }
                disabled
                readOnly
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Disponibile"
              name="disponibile"
              checked={formData.disponibile}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid() || isLoadingPartita}
          >
            {isLoadingPartita ? "Caricamento..." : "Salva"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AdminPackageEditModal;
