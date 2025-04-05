import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // Default role is "user"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
  
        const userRes = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
  
        const user = await userRes.json();
  
        if (userRes.ok) {
          localStorage.setItem("userName", user.name);
          localStorage.setItem("userRole", user.role);
          navigate("/dashboard");
        } else {
          setError("Failed to fetch user details");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };
  
  return (
    <Container>
      <LoginBox>
        <h2>Login</h2>
        <RoleSelector>
          <label>
            <input
              type="radio"
              value="user"
              checked={role === "user"}
              onChange={() => setRole("user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === "admin"}
              onChange={() => setRole("admin")}
            />
            Admin
          </label>
        </RoleSelector>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button onClick={handleLogin}>Login</Button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </LoginBox>
    </Container>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/images/bg.jpg") no-repeat center center/cover;
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RoleSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;