import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenuCategories(res.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const getAllCategories = () => {
    const categories = ["All", ...menuCategories.map((category) => category.category)];
    return categories;
  };

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 0) updated[id] -= 1;
      if (updated[id] === 0) delete updated[id];
      return updated;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const item = menuCategories.flatMap((category) => category.items).find((item) => item.id === id);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  };

  const handleGoToCart = () => {
    navigate("/cart", { state: { cart, menuCategories } });
  };

  const filteredCategories =
    activeCategory === "All"
      ? menuCategories
      : menuCategories.filter((category) => category.category === activeCategory);

  return (
    <Container>
      <Header>
        <h1>Menu</h1>
        <CartButton onClick={handleGoToCart}>
          Go to Cart {getCartItemCount() > 0 && <CartCount>{getCartItemCount()}</CartCount>}
        </CartButton>
      </Header>

      <CategoryNav>
        {getAllCategories().map((category) => (
          <CategoryButton
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryNav>

      <ItemsContainer>
        {filteredCategories.map((category) => (
          <div key={category.category}>
            {activeCategory !== "All" && <CategoryTitle>{category.category}</CategoryTitle>}
            <ItemsGrid>
              {category.items.map((item) => (
                <Item key={item.id}>
                  <ItemTopSection 
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <ItemImage src={item.img} alt={item.name} />
                    <ItemInfo>
                      <h3>{item.name}</h3>
                      <p>₹{item.price}</p>
                    </ItemInfo>

                    {hoveredItem && hoveredItem.id === item.id && (
                      <NutritionOverlay>
                        <NutritionTitle>Nutritional Information</NutritionTitle>
                        <NutritionRow>
                          <span>Calories:</span>
                          <span>{item.nutrition?.calories || "N/A"}</span>
                        </NutritionRow>
                        <NutritionRow>
                          <span>Carbs:</span>
                          <span>{item.nutrition?.carbs || "N/A"}</span>
                        </NutritionRow>
                        <NutritionRow>
                          <span>Protein:</span>
                          <span>{item.nutrition?.protein || "N/A"}</span>
                        </NutritionRow>
                        <NutritionRow>
                          <span>Fat:</span>
                          <span>{item.nutrition?.fat || "N/A"}</span>
                        </NutritionRow>
                        <NutritionRow>
                          <span>Sugar:</span>
                          <span>{item.nutrition?.sugar || "N/A"}</span>
                        </NutritionRow>
                      </NutritionOverlay>
                    )}
                  </ItemTopSection>
                  <Controls>
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{cart[item.id] || 0}</span>
                    <button onClick={() => addToCart(item.id)}>+</button>
                  </Controls>
                </Item>
              ))}
            </ItemsGrid>
          </div>
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default Menu;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  h1 {
    margin: 0;
    color: #d32f2f;
  }
`;

const CartButton = styled.button`
  position: relative;
  padding: 10px 20px;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b71c1c;
  }
`;

const CartCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #d32f2f;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-left: 8px;
`;

const CategoryNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.active ? '#d32f2f' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : 'black'};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.active ? '#b71c1c' : '#e0e0e0'};
  }
`;

const ItemsContainer = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  color: #d32f2f;
  border-bottom: 2px solid #d32f2f;
  padding-bottom: 5px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemTopSection = styled.div`
  position: relative;
  flex-grow: 1;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  padding: 15px;
  flex-grow: 1;

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-weight: bold;
    color: #d32f2f;
    font-size: 16px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #f5f5f5;

  button {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background-color: #d32f2f;
    color: white;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #b71c1c;
    }
  }

  span {
    font-weight: bold;
  }
`;

const NutritionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ItemTopSection}:hover & {
    opacity: 1;
  }
`;

const NutritionTitle = styled.h4`
  margin: 0 0 10px 0;
  color: #d32f2f;
  text-align: center;
  font-size: 16px;
`;

const NutritionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
`;