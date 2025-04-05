import React, { useEffect, useState } from "react";
import {
  getAllMenu,
  addItemToCategory,
  deleteItemFromCategory
} from "../Api"; // Adjust path if needed
import styled from "styled-components";

const ManageInventory = () => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    img: "",
    id: "",
    nutrition: {
      calories: "",
      carbs: "",
      protein: "",
      fat: "",
      sugar: "",
    },
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await getAllMenu();
      setMenuCategories(data);
    } catch (err) {
      console.error("Error fetching menu:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.nutrition) {
      setFormData({
        ...formData,
        nutrition: {
          ...formData.nutrition,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      id: parseInt(formData.id),
      name: formData.name,
      price: parseFloat(formData.price),
      img: formData.img,
      nutrition: formData.nutrition,
    };

    try {
      await addItemToCategory(formData.category, newItem);
      fetchMenu();
      setFormData({
        category: "",
        name: "",
        price: "",
        img: "",
        id: "",
        nutrition: {
          calories: "",
          carbs: "",
          protein: "",
          fat: "",
          sugar: "",
        },
      }); // Clear form after submission
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleDelete = async (category, id) => {
    try {
      await deleteItemFromCategory(category, id);
      fetchMenu();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <Container>
      <Heading>Manage Inventory</Heading>
      <Form onSubmit={handleSubmit}>
        <FormRow>
          <Input name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
          <Input name="category" placeholder="Category" value={formData.category} onChange={handleChange} required />
        </FormRow>
        <FormRow>
          <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <Input name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        </FormRow>
        <FormRow>
          <Input name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} required />
        </FormRow>
        <NutritionTitle>Nutrition Information</NutritionTitle>
        <NutritionWrapper>
          <Input name="calories" placeholder="Calories" value={formData.nutrition.calories} onChange={handleChange} />
          <Input name="carbs" placeholder="Carbs" value={formData.nutrition.carbs} onChange={handleChange} />
          <Input name="protein" placeholder="Protein" value={formData.nutrition.protein} onChange={handleChange} />
          <Input name="fat" placeholder="Fat" value={formData.nutrition.fat} onChange={handleChange} />
          <Input name="sugar" placeholder="Sugar" value={formData.nutrition.sugar} onChange={handleChange} />
        </NutritionWrapper>
        <SubmitButton type="submit">Add Item</SubmitButton>
      </Form>

      <CurrentMenu>
        <h2>Current Menu</h2>
        {menuCategories.map((cat) => (
          <CategoryContainer key={cat.category}>
            <CategoryTitle>{cat.category}</CategoryTitle>
            {cat.items.map((item) => (
              <ItemCard key={item.id}>
                <ItemInfo>
                  <p><strong>{item.name}</strong> - ₹{item.price}</p>
                  {item.nutrition && (
                    <NutritionInfo>
                      {item.nutrition.calories && <span>Calories: {item.nutrition.calories}</span>}
                      {item.nutrition.protein && <span>Protein: {item.nutrition.protein}g</span>}
                    </NutritionInfo>
                  )}
                </ItemInfo>
                <Button onClick={() => handleDelete(cat.category, item.id)}>Out of Stock</Button>
              </ItemCard>
            ))}
          </CategoryContainer>
        ))}
      </CurrentMenu>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
  background: #f8f8f8;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const FormRow = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  flex: 1;
  min-width: 0;
  &:focus {
    outline: none;
    border-color: #ff4136;
  }
`;

const NutritionTitle = styled.h4`
  margin: 15px 0 5px 0;
  color: #555;
  font-size: 1.1rem;
`;

const NutritionWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #ff4136;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 10px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e03e36;
  }
`;

const CurrentMenu = styled.div`
  margin-top: 40px;
`;

const CategoryContainer = styled.div`
  margin-bottom: 30px;
`;

const CategoryTitle = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #ff4136;
`;

const ItemCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const ItemInfo = styled.div`
  flex-grow: 1;
  p {
    font-size: 1.1rem;
    margin: 0 0 5px 0;
    color: #333;
  }
`;

const NutritionInfo = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
  color: #666;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #ff4136;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e03e36;
  }
`;

export default ManageInventory;