import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminPackageList from "../../components/Admin/AdminPackageList";

const AdminPackages = () => {
  const handleEdit = (pacchetto) => {
    console.log("Modifica pacchetto:", pacchetto);
  };

  const handleDelete = (id) => {
    console.log("Elimina pacchetto con id:", id);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="mb-4">Gestione Pacchetti Viaggio</h1>
        </Col>
      </Row>
      <AdminPackageList onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
};

export default AdminPackages;
