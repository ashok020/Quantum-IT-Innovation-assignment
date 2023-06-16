import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    setIsAuthenticated(!!token);
  }, []);
  const handleLogin = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HomePage handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
