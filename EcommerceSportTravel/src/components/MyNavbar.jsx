import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import "./MyNavbar.css";

function MyNavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
              Pacchetti Viaggio
            </Nav.Link>

            {user ? (
              <>
                {user.role === "Admin" && (
                  <Nav.Link as={NavLink} to="/admin" className="link-custom">
                    Admin
                  </Nav.Link>
                )}

                <Nav.Link
                  as={NavLink}
                  to="/userBookings"
                  className="link-custom"
                >
                  Le mie prenotazioni
                </Nav.Link>

                <NavDropdown
                  title={user.name}
                  id="user-dropdown"
                  className="link-custom"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" className="link-custom">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signup" className="link-custom">
                  Registrati
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
