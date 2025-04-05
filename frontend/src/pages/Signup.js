import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleSignup = async () => {
    setError("");
    if (role === "user" && !email.endsWith("@mitwpu.edu.in")) {
      setError("Please use your @mitwpu.edu.in email address.");
      return;
    }
  
    if (role === "user" && (cardNumber.length !== 10 || isNaN(cardNumber))) {
      setError("Card number must be exactly 10 digits.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: fullName, email, password, cardNumber, role }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
  
        // Fetch user details using token
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
      setError("An error occurred during signup.");
    }
  };
  

  return (
    <Container>
      <SignupBox>
        <h2>Sign Up</h2>
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
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
        {role === "user" && (
          <Input
            type="text"
            placeholder="Enter Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button onClick={handleSignup}>Sign Up</Button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </SignupBox>
    </Container>
  );
};

export default Signup;

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("/images/bg.jpg") no-repeat center center/cover;
`;

const SignupBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
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

  &:hover {
    background: #b71c1c; /* Darker red on hover */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
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