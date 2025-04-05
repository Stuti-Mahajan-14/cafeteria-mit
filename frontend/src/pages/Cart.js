import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, menuCategories } = location.state || { cart: {}, menuCategories: [] };

  const getTotalAmount = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const allItems = menuCategories.flatMap((category) => category.items);
      const item = allItems.find((item) => item.id === parseInt(id));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const handleEditOrder = () => {
    navigate("/menu"); // Redirect to the Menu page
  };

  return (
    <Container>
      <h1>Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <EmptyCart>Your cart is empty.</EmptyCart>
      ) : (
        <>
          <CartItems>
            {Object.entries(cart).map(([id, quantity]) => {
              const allItems = menuCategories.flatMap((category) => category.items);
              const item = allItems.find((item) => item.id === parseInt(id));
              return item ? (
                <CartItem key={id}>
                  <ItemInfo>
                    <h3>{item.name}</h3>
                    <p>₹{item.price} x {quantity}</p>
                  </ItemInfo>
                  <p>₹{item.price * quantity}</p>
                </CartItem>
              ) : null;
            })}
          </CartItems>
          <TotalAmount>
            <span>Total:</span>
            <span>₹{getTotalAmount()}</span>
          </TotalAmount>

          {/* Payment Message */}
          <PaymentMessage>
            Please place your card to pay.
          </PaymentMessage>

          {/* Edit Order Button */}
          <EditOrderButton onClick={handleEditOrder}>
            Edit Order
          </EditOrderButton>
        </>
      )}
    </Container>
  );
};

export default Cart;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const EmptyCart = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const CartItems = styled.div`
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`;

const ItemInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 16px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #666;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 2px solid #eee;
  font-weight: bold;
  font-size: 18px;
`;

const PaymentMessage = styled.p`
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-top: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const EditOrderButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b71c1c;
  }
`;