import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./MyNavbar.css";

function MyNavBar() {
  return (
    <Navbar expand="lg" className="bg-custom" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-custom">
          ⚽ Calcio e Viaggi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/packages" className="link-custom">
              Pacchetti
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="link-custom">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup" className="link-custom">
              Registrati
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
