import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { FaUserCircle, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
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
      const res = await axios.post("/auth/register", {
        name,
        dateOfBirth,
        email,
        password,
      });
      if (res.data.success) setTimeout(() => navigate("/login"), 1000);
      setError(res.data.message);
    } catch (error) {
      setError("Registration failed");
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
          REGISTER
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
          <Form.Group controlId="name">
            <div className="input-icon mb-3">
              <FaUser
                className="icon border-end pe-2"
                style={{ color: iconColor, fontSize: "20px" }}
              />
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                style={{ backgroundColor: inputBgColor, color: iconColor }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <div className="input-icon mb-3">
              <MdDateRange
                className="icon border-end pe-2"
                style={{ color: iconColor, fontSize: "25px" }}
              />
              <Form.Control
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="Date of Birth"
                required
                style={{ backgroundColor: inputBgColor, color: iconColor }}
              />
            </div>
          </Form.Group>
          <Form.Group controlId="email">
            <div className="input-icon mb-3">
              <FaEnvelope
                className="icon border-end pe-2"
                style={{ color: iconColor, fontSize: "20px" }}
              />
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
                placeholder="Password"
                required
                style={{ backgroundColor: inputBgColor, color: iconColor }}
              />
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 border-0"
            style={{ backgroundColor: highlightColor, color: cardColor }}
          >
            REGISTER
          </Button>
          <Button
            variant="primary"
            className="w-100 mt-3 border-0"
            style={{ backgroundColor: highlightColor, color: cardColor }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RegistrationForm;
