import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Navbar = () => {
  const [userName, setUserName] = useState("Guest");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // Assuming token is saved at login

      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUserName(data.name); // Assuming your user schema has a 'name' field
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Nav>
      <Logo>MIT- Campus Canteen</Logo>
      <Profile>
        <span>👤 Welcome, {userName}</span>
      </Profile>
    </Nav>
  );
};

export default Navbar;

// Styled Components
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
`;

const Logo = styled.h2`
  font-size: 20px;
`;

const Profile = styled.div`
  font-size: 16px;
`;
