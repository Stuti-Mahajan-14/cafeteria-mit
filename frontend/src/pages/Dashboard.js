import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Retrieve user role from localStorage
  const userRole = localStorage.getItem("userRole");

  return (
    <Container>
    <Navbar />
    <Content>
      <Grid>
        {/* Food Menu Card for User Only */}
        {userRole === "user" && (
          <Card to="/menu">
            🍔 <h3>Food Menu</h3>
            <p>Explore delicious options</p>
          </Card>
        )}

        {/* Cards for User */}
        {userRole === "user" && (
          <>
            <Card to="#">
              💳 <h3>RFID Card Balance</h3>
              <p>Check your available balance</p>
            </Card>
            <Card to="#">
              📊 <h3>Order History</h3>
              <p>View past transactions</p>
            </Card>
          </>
        )}

        {/* Cards for Admin */}
        {userRole === "admin" && (
          <>
          <Card to="/ManageInventory">
  📦        <h3>Manage Inventory</h3>
            <p>Handle items in stock</p>
          </Card> 
            <Card to="#">
              📝 <h3>View Orders</h3>
              <p>Monitor all orders</p>
            </Card>
            <Card to="#">
              💬 <h3>View Feedbacks</h3>
              <p>Check customer feedbacks</p>
            </Card>
          </>
        )}
      </Grid>
    </Content>
  </Container>
  );
};

export default Dashboard;

// Styled Components
const Container = styled.div`
  height: 100vh;
  background: url("/images/bg.jpg") no-repeat center center/cover;
`;

const Content = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const Card = styled(Link)`
  background: #d32f2f; /* Dark Red */
  padding: 30px;
  text-align: center;
  border-radius: 10px;
  text-decoration: none;
  color: white;
  font-size: 18px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: rgb(235, 96, 96); /* Lighter Red */
    transform: scale(1.05);
  }

  h3 {
    margin: 10px 0;
  }

  p {
    font-size: 14px;
    opacity: 0.8;
  }
`;