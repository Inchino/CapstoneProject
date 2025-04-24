import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AdminPackageEditModal = ({ show, handleClose, pacchetto, onSave }) => {
  const [formData, setFormData] = useState({ ...pacchetto });

  useEffect(() => {
    if (pacchetto) {
      setFormData({
        id: pacchetto.id,
        titolo: pacchetto.titolo,
        descrizione: pacchetto.descrizione,
        prezzo: pacchetto.prezzo,
        durata: pacchetto.durata,
        immagineUrl: pacchetto.immagineUrl,
        disponibile: pacchetto.disponibile,
        partitaId: pacchetto.partitaId ?? '',
        cittaId: pacchetto.cittaId ?? ''
      });
    }
  }, [pacchetto]);  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dati da inviare:", formData);
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Pacchetto Viaggio</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Titolo</Form.Label>
            <Form.Control
              type="text"
              name="titolo"
              value={formData.titolo || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              name="descrizione"
              value={formData.descrizione || ""}
              onChange={handleChange}
              rows={3}
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
              <option value="">Seleziona...</option>
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
              value={formData.immagineUrl || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

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
          <Button variant="primary" type="submit">
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AdminPackageEditModal;
