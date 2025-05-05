import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../services/authService";
import { login } from "../redux/authSlice";
import "./Login.css"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthDate: "",
    email: "",
    password: "",
    role: "User",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const { name, surname, birthDate, email, password } = formData;

    if (!name || !surname || !birthDate || !email || !password) {
      return "Tutti i campi sono obbligatori.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Inserisci un'email valida.";
    }

    if (password.length < 6) {
      return "La password deve contenere almeno 6 caratteri.";
    }

    return null;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const message = await registerUser(formData);
      setSuccess(message);

      // 🔐 Login automatico
      const token = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      dispatch(login(token));
      navigate("/");
    } catch (err) {
      setError(err.message || "Errore durante la registrazione.");
    }
  };

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Registrati</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Data di nascita</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </Form.Group>

        <div className="text-center">
          <button type="submit" className="btn-login">
            <span>Registrati</span>
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default Signup;
