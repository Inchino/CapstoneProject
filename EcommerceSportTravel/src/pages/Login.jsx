import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../services/authService";
import { login } from "../redux/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.email || !formData.password) return "Tutti i campi sono obbligatori.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Email non valida.";
    if (formData.password.length < 6) return "Password troppo corta.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      const token = await loginUser(formData);
      dispatch(login(token));
      navigate("/");
    } catch (err) {
      setError(err.message || "Errore di autenticazione.");
    }
  };

  return (
    <Container className="mt-5 mb-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-4">
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

        <Button variant="primary" type="submit" className="w-100">
          Accedi
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
