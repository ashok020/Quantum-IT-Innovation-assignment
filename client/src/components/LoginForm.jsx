import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { FaUserCircle, FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mainColor = "#007c89";
  const cardColor = "#1c2c4c";
  const inputBgColor = "#4d5974";
  const iconColor = "#9aa4bf";
  const highlightColor = "#00f5e1";
  const textColor = "#005b70";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, user, message } = response.data;

      // Store the token and user data in localStorage

      if (message) setError(response.data.message);
      else {
        setError("Success");
        setTimeout(() => handleLogin({ token, user }), 1000);
      }
    } catch (error) {
      setError("Client Error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: mainColor }}
    >
      <Card
        className="p-4 position-relative"
        style={{ backgroundColor: cardColor }}
      >
        <p
          className="position-absolute top-0 start-50 translate-middle w-50 px-3 py-2 text-center"
          style={{
            backgroundColor: highlightColor,
            color: cardColor,
          }}
        >
          SIGN IN
        </p>
        <div className="text-center mb-4">
          <div className="position-relative d-inline-block">
            <div className="mt-5 mb-3">
              <FaUserCircle style={{ fontSize: "80px", color: iconColor }} />
            </div>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="email">
            <div className="input-icon mb-3">
              <FaUser
                className="icon border-end pe-2"
                style={{ color: iconColor, fontSize: "20px" }}
              />
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username"
                required
                style={{ backgroundColor: inputBgColor, color: iconColor }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="password">
            <div className="input-icon mb-3">
              <FaLock
                className="icon border-end pe-2"
                style={{ color: iconColor, fontSize: "20px" }}
              />
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                style={{ backgroundColor: inputBgColor, color: iconColor }}
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between mb-3">
            <Form.Check
              type="checkbox"
              label="Remember me"
              style={{ fontSize: "12px", color: textColor }}
            />
            <a
              href="#"
              style={{
                textDecoration: "none",
                fontSize: "12px",
                color: textColor,
              }}
            >
              Forgot password?
            </a>
          </div>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 border-0"
            style={{ backgroundColor: highlightColor, color: cardColor }}
          >
            LOGIN
          </Button>
          <Button
            variant="primary"
            className="w-100 mt-3 border-0"
            style={{ backgroundColor: highlightColor, color: cardColor }}
            onClick={() => navigate("/register")}
          >
            REGISTER
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
