import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

const HomePage = ({ handleLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  const name = user.name;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users", error);
      });
  }, []);

  return (
    <div className="p-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Hi! {name}</h2>
        <Button
          variant="primary"
          className="p-3 m-3 border-0"
          onClick={handleLogout}
        >
          Log Out <FaSignOutAlt className="ms-2" />
        </Button>
      </div>
      <h3>List of all users:</h3>
      <div className="d-flex flex-column m-4">
        {users.map((u) => (
          <Card className="w-100 p-2" key={u.email}>
            <Card.Body className="d-flex justify-content-between">
              <Card.Title>{u.name}</Card.Title>
              <Card.Text>{u.email}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
