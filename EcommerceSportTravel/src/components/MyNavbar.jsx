import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { FaUserCircle } from "react-icons/fa";
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
    <Navbar expand="lg" className="bg-custom shadow-sm" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand-custom d-flex align-items-center">
          <Image src="/GoalAwayLogo.png" alt="GoalAway logo" height="55" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-content" className="border-0" />

        <Navbar.Collapse id="navbar-content">
          <Nav className="ms-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              className={({ isActive }) =>
                isActive ? "link-custom active-link" : "link-custom"
              }
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/packages"
              className={({ isActive }) =>
                isActive ? "link-custom active-link" : "link-custom"
              }
            >
              Pacchetti Viaggio
            </Nav.Link>

            {user ? (
              <>
                {(user.role === "Admin" || user.role === "SuperAdmin") && (
                  <Nav.Link
                    as={NavLink}
                    to="/admin/packages"
                    className={({ isActive }) =>
                      isActive ? "link-custom active-link" : "link-custom"
                    }
                  >
                    Admin
                  </Nav.Link>
                )}

                <Nav.Link
                  as={NavLink}
                  to="/userBookings"
                  className={({ isActive }) =>
                    isActive ? "link-custom active-link" : "link-custom"
                  }
                >
                  Le mie prenotazioni
                </Nav.Link>

                <NavDropdown
                  title={
                    <span className="d-flex align-items-center user-dropdown-title">
                      <FaUserCircle className="me-1" size={18} />
                      {user.name}
                    </span>
                  }
                  id="user-dropdown"
                  align="end"
                  className="dropdown-custom"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "link-custom active-link" : "link-custom"
                  }
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? "link-custom active-link" : "link-custom"
                  }
                >
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
