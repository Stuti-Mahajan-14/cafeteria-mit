import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const menuCategories = [
  {
    category: "Hot Drinks",
    items: [
      { 
        id: 1, 
        name: "Tea", 
        price: 15, 
         available: true,  // <-- Add this
        img: "/images/tea.jpeg",
        nutrition: {
          calories: 30,
          carbs: "5g",
          protein: "1g",
          fat: "0g",
          sugar: "4g"
        }
      },
      { 
        id: 2, 
        name: "Coffee", 
        price: 20, 
        img: "/images/coffee.jpg",
        nutrition: {
          calories: 5,
          carbs: "0g",
          protein: "0g",
          fat: "0g",
          sugar: "0g"
        }
      },
    ]
  },
  {
    category: "Cold Drinks",
    items: [
      { 
        id: 3, 
        name: "Lassi", 
        price: 30, 
        img: "/images/lassi.jpg",
        nutrition: {
          calories: 150,
          carbs: "20g",
          protein: "8g",
          fat: "5g",
          sugar: "15g"
        }
      },
      { 
        id: 4, 
        name: "Koham Sharbat", 
        price: 30, 
        img: "/images/koham-sharbat.jpg",
        nutrition: {
          calories: 120,
          carbs: "30g",
          protein: "0g",
          fat: "0g",
          sugar: "28g"
        }
      },
      { 
        id: 5, 
        name: "1 Ltr. Water Bottle", 
        price: 20, 
        img: "/images/water.jpeg",
        nutrition: {
          calories: 0,
          carbs: "0g",
          protein: "0g",
          fat: "0g",
          sugar: "0g"
        }
      }
    ]
  },
  {
    category: "Snacks",
    items: [
      { 
        id: 6, 
        name: "Medu Vau", 
        price: 35, 
        img: "/images/medu-vau.jpg",
        nutrition: {
          calories: 150,
          carbs: "25g",
          protein: "6g",
          fat: "3g",
          sugar: "2g"
        }
      },
      { 
        id: 7, 
        name: "Samosa Masala", 
        price: 35, 
        img: "/images/samosa-masala.jpg",
        nutrition: {
          calories: 260,
          carbs: "30g",
          protein: "5g",
          fat: "12g",
          sugar: "3g"
        }
      },
      { 
        id: 8, 
        name: "Misal Pav", 
        price: 55, 
        img: "/images/misal-pav.jpg",
        nutrition: {
          calories: 350,
          carbs: "45g",
          protein: "15g",
          fat: "12g",
          sugar: "5g"
        }
      },
      { 
        id: 9, 
        name: "Pohe (Upto 10:00 AM)", 
        price: 30, 
        img: "/images/pohe.jpg",
        nutrition: {
          calories: 200,
          carbs: "35g",
          protein: "5g",
          fat: "5g",
          sugar: "2g"
        }
      },
      { 
        id: 10, 
        name: "Upma (Upto 10:00 AM)", 
        price: 30, 
        img: "/images/upma.jpg",
        nutrition: {
          calories: 250,
          carbs: "40g",
          protein: "6g",
          fat: "8g",
          sugar: "3g"
        }
      },
      { 
        id: 11, 
        name: "Idli (After 11:00 AM)", 
        price: 40, 
        img: "/images/idli.jpg",
        nutrition: {
          calories: 120,
          carbs: "25g",
          protein: "4g",
          fat: "1g",
          sugar: "1g"
        }
      },
      { 
        id: 12, 
        name: "Dabeli (After 4:00 PM)", 
        price: 40, 
        img: "/images/cherry-dabeli.jpg",
        nutrition: {
          calories: 300,
          carbs: "45g",
          protein: "6g",
          fat: "10g",
          sugar: "8g"
        }
      }
    ]
  },
  {
    category: "Lunch (11:00 AM to 3:00 PM)",
    items: [
      { 
        id: 13, 
        name: "Pav Bhaji", 
        price: 75, 
        img: "/images/pav-bhaji.jpg",
        nutrition: {
          calories: 400,
          carbs: "60g",
          protein: "12g",
          fat: "15g",
          sugar: "10g"
        }
      },
      { 
        id: 14, 
        name: "Aloo Paratha", 
        price: 55, 
        img: "/images/aloo-paratha.jpg",
        nutrition: {
          calories: 350,
          carbs: "50g",
          protein: "8g",
          fat: "12g",
          sugar: "5g"
        }
      },
      { 
        id: 15, 
        name: "Butter Cheese Aloo Paratha", 
        price: 85, 
        img: "/images/butter-cheese-aloo-paratha.jpg",
        nutrition: {
          calories: 500,
          carbs: "55g",
          protein: "15g",
          fat: "25g",
          sugar: "6g"
        }
      },
      { 
        id: 16, 
        name: "Butter Pav Bhaji", 
        price: 90, 
        img: "/images/butter-pav-bhaji.jpg",
        nutrition: {
          calories: 500,
          carbs: "65g",
          protein: "15g",
          fat: "22g",
          sugar: "12g"
        }
      },
      { 
        id: 17, 
        name: "Extra Pav Jodi", 
        price: 20, 
        img: "/images/extra-pav-jodi.jpg",
        nutrition: {
          calories: 150,
          carbs: "25g",
          protein: "5g",
          fat: "3g",
          sugar: "2g"
        }
      }
    ]
  },
  {
    category: "Jumbo Sandwiches",
    items: [
      { 
        id: 18, 
        name: "Bread Butter", 
        price: 40, 
        img: "/images/bread-butter.jpg",
        nutrition: {
          calories: 200,
          carbs: "25g",
          protein: "4g",
          fat: "10g",
          sugar: "3g"
        }
      },
      { 
        id: 19, 
        name: "Bread Butter", 
        price: 40, 
        img: "/images/bread-butter.jpg",
        nutrition: {
          calories: 200,
          carbs: "25g",
          protein: "4g",
          fat: "10g",
          sugar: "3g"
        }
      },
      { 
        id: 20, 
        name: "Toast Butter", 
        price: 50, 
        img: "/images/toast-butter.jpg",
        nutrition: {
          calories: 220,
          carbs: "25g",
          protein: "5g",
          fat: "12g",
          sugar: "3g"
        }
      },
      { 
        id: 21, 
        name: "Vegetable Sandwich", 
        price: 55, 
        img: "/images/vegetable-sandwich.jpg",
        nutrition: {
          calories: 250,
          carbs: "30g",
          protein: "8g",
          fat: "10g",
          sugar: "5g"
        }
      },
      { 
        id: 22, 
        name: "Vegetable Cheese Sandwich", 
        price: 75, 
        img: "/images/vegetable-cheese-sandwich.jpg",
        nutrition: {
          calories: 350,
          carbs: "30g",
          protein: "15g",
          fat: "18g",
          sugar: "5g"
        }
      },
      { 
        id: 23, 
        name: "Plain Cheese Sandwich", 
        price: 65, 
        img: "/images/plain-cheese-sandwich.jpg",
        nutrition: {
          calories: 300,
          carbs: "25g",
          protein: "12g",
          fat: "15g",
          sugar: "3g"
        }
      },
      { 
        id: 24, 
        name: "Grill Sandwich", 
        price: 65, 
        img: "/images/grill-sandwich.jpg",
        nutrition: {
          calories: 280,
          carbs: "30g",
          protein: "10g",
          fat: "12g",
          sugar: "4g"
        }
      },
      { 
        id: 25, 
        name: "Grill Cheese Sandwich", 
        price: 85, 
        img: "/images/grill-cheese-sandwich.jpg",
        nutrition: {
          calories: 380,
          carbs: "30g",
          protein: "18g",
          fat: "20g",
          sugar: "4g"
        }
      },
      { 
        id: 26, 
        name: "Grill Vegetable Sandwich", 
        price: 75, 
        img: "/images/grill-vegetable-sandwich.jpg",
        nutrition: {
          calories: 300,
          carbs: "35g",
          protein: "12g",
          fat: "12g",
          sugar: "6g"
        }
      },
      { 
        id: 27, 
        name: "Grill Veg. Cheese Sandwich", 
        price: 95, 
        img: "/images/grill-veg-cheese-sandwich.jpg",
        nutrition: {
          calories: 420,
          carbs: "35g",
          protein: "20g",
          fat: "22g",
          sugar: "6g"
        }
      },
      { 
        id: 28, 
        name: "Grill Cheese Chilly Sandwich", 
        price: 85, 
        img: "/images/grill-cheese-chilly-sandwich.jpg",
        nutrition: {
          calories: 380,
          carbs: "30g",
          protein: "18g",
          fat: "20g",
          sugar: "5g"
        }
      },
      { 
        id: 29, 
        name: "Grill Corn Sandwich", 
        price: 85, 
        img: "/images/grill-corn-sandwich.jpg",
        nutrition: {
          calories: 350,
          carbs: "40g",
          protein: "12g",
          fat: "15g",
          sugar: "8g"
        }
      },
      { 
        id: 30, 
        name: "Grill Garlic Cheese Sandwich", 
        price: 85, 
        img: "/images/grill-garlic-cheese-sandwich.jpg",
        nutrition: {
          calories: 400,
          carbs: "30g",
          protein: "15g",
          fat: "22g",
          sugar: "4g"
        }
      }
    ]
  },
  {
    category: "South Indian",
    items: [
      { 
        id: 31, 
        name: "Idli / Vada", 
        price: 40, 
        img: "/images/idli-vada.jpg",
        nutrition: {
          calories: 200,
          carbs: "35g",
          protein: "8g",
          fat: "5g",
          sugar: "2g"
        }
      },
      { 
        id: 32, 
        name: "Idli Wada Chatni Sambar", 
        price: 50, 
        img: "/images/idli-wada-chatni-sambar.jpg",
        nutrition: {
          calories: 250,
          carbs: "40g",
          protein: "10g",
          fat: "6g",
          sugar: "5g"
        }
      },
      { 
        id: 33, 
        name: "Batata Wada Chatni Sambar", 
        price: 45, 
        img: "/images/batata-wada-chatni-sambar.jpg",
        nutrition: {
          calories: 280,
          carbs: "35g",
          protein: "6g",
          fat: "12g",
          sugar: "4g"
        }
      },
      { 
        id: 34, 
        name: "Mix Wada Chatni Sambar", 
        price: 45, 
        img: "/images/mix-wada-chatni-sambar.jpg",
        nutrition: {
          calories: 300,
          carbs: "35g",
          protein: "8g",
          fat: "15g",
          sugar: "5g"
        }
      }
    ]
  },
  {
    category: "Fasting",
    items: [
      { 
        id: 35, 
        name: "Sabudana Wada", 
        price: 40, 
        img: "/images/sabudana-wada.jpg",
        nutrition: {
          calories: 220,
          carbs: "30g",
          protein: "3g",
          fat: "10g",
          sugar: "2g"
        }
      },
      { 
        id: 36, 
        name: "Lassi / Salted Lassi", 
        price: 30, 
        img: "/images/lassi-salted.jpg",
        nutrition: {
          calories: 150,
          carbs: "20g",
          protein: "8g",
          fat: "5g",
          sugar: "15g"
        }
      }
    ]
  },
  {
    category: "Dosa",
    items: [
      { 
        id: 50, 
        name: "Sada Dosa", 
        price: 50, 
        img: "/images/sada-dosa.jpg",
        nutrition: {
          calories: 180,
          carbs: "30g",
          protein: "5g",
          fat: "5g",
          sugar: "2g"
        }
      },
      { 
        id: 51, 
        name: "Butter Sada Dosa", 
        price: 60, 
        img: "/images/butter-sada-dosa.jpg",
        nutrition: {
          calories: 250,
          carbs: "30g",
          protein: "5g",
          fat: "12g",
          sugar: "2g"
        }
      },
      { 
        id: 52, 
        name: "Cheese Sada Dosa", 
        price: 75, 
        img: "/images/cheese-sada-dosa.jpg",
        nutrition: {
          calories: 320,
          carbs: "30g",
          protein: "12g",
          fat: "18g",
          sugar: "2g"
        }
      },
      { 
        id: 53, 
        name: "Butter Cheese Sada Dosa", 
        price: 85, 
        img: "/images/butter-cheese-sada-dosa.jpg",
        nutrition: {
          calories: 380,
          carbs: "30g",
          protein: "12g",
          fat: "22g",
          sugar: "2g"
        }
      },
      { 
        id: 54, 
        name: "Masala Dosa", 
        price: 60, 
        img: "/images/masala-dosa.jpg",
        nutrition: {
          calories: 220,
          carbs: "35g",
          protein: "6g",
          fat: "7g",
          sugar: "3g"
        }
      },
      { 
        id: 55, 
        name: "Butter Masala Dosa", 
        price: 70, 
        img: "/images/butter-masala-dosa.jpg",
        nutrition: {
          calories: 300,
          carbs: "35g",
          protein: "6g",
          fat: "15g",
          sugar: "3g"
        }
      },
      { 
        id: 56, 
        name: "Cheese Masala Dosa", 
        price: 85, 
        img: "/images/cheese-masala-dosa.jpg",
        nutrition: {
          calories: 380,
          carbs: "35g",
          protein: "15g",
          fat: "20g",
          sugar: "3g"
        }
      },
      { 
        id: 57, 
        name: "Butter Cheese Masala Dosa", 
        price: 95, 
        img: "/images/butter-cheese-masala-dosa.jpg",
        nutrition: {
          calories: 450,
          carbs: "35g",
          protein: "15g",
          fat: "25g",
          sugar: "3g"
        }
      },
      { 
        id: 58, 
        name: "Butter Cut Dosa", 
        price: 70, 
        img: "/images/butter-cut-dosa.jpg",
        nutrition: {
          calories: 280,
          carbs: "35g",
          protein: "5g",
          fat: "15g",
          sugar: "2g"
        }
      },
      { 
        id: 59, 
        name: "Paper Cut Dosa", 
        price: 95, 
        img: "/images/paper-cut-dosa.jpg",
        nutrition: {
          calories: 320,
          carbs: "40g",
          protein: "6g",
          fat: "15g",
          sugar: "2g"
        }
      },
      { 
        id: 60, 
        name: "Butter Cheese Cut Dosa", 
        price: 100, 
        img: "/images/butter-cheese-cut-dosa.jpg",
        nutrition: {
          calories: 420,
          carbs: "40g",
          protein: "15g",
          fat: "22g",
          sugar: "2g"
        }
      },
      { 
        id: 61, 
        name: "Mysore Dosa", 
        price: 70, 
        img: "/images/mysore-dosa.jpg",
        nutrition: {
          calories: 250,
          carbs: "35g",
          protein: "6g",
          fat: "10g",
          sugar: "4g"
        }
      },
      { 
        id: 62, 
        name: "Cheese Mysore Sada Dosa", 
        price: 95, 
        img: "/images/cheese-mysore-sada-dosa.jpg",
        nutrition: {
          calories: 380,
          carbs: "35g",
          protein: "15g",
          fat: "20g",
          sugar: "4g"
        }
      },
      { 
        id: 63, 
        name: "Mysore Masala Dosa", 
        price: 100, 
        img: "/images/mysore-masala-dosa.jpg",
        nutrition: {
          calories: 300,
          carbs: "40g",
          protein: "8g",
          fat: "12g",
          sugar: "5g"
        }
      },
      { 
        id: 64, 
        name: "Mysore Masala Dosa", 
        price: 80, 
        img: "/images/mysore-masala-dosa.jpg",
        nutrition: {
          calories: 300,
          carbs: "40g",
          protein: "8g",
          fat: "12g",
          sugar: "5g"
        }
      },
      { 
        id: 65, 
        name: "Butter Mysore Masala Dosa", 
        price: 90, 
        img: "/images/butter-mysore-masala-dosa.jpg",
        nutrition: {
          calories: 380,
          carbs: "40g",
          protein: "8g",
          fat: "20g",
          sugar: "5g"
        }
      },
      { 
        id: 66, 
        name: "Cheese Mysore Masala Dosa", 
        price: 100, 
        img: "/images/cheese-mysore-masala-dosa.jpg",
        nutrition: {
          calories: 450,
          carbs: "40g",
          protein: "18g",
          fat: "22g",
          sugar: "5g"
        }
      },
      { 
        id: 67, 
        name: "Butter Cheese Mysore Masala Dosa", 
        price: 110, 
        img: "/images/butter-cheese-mysore-masala-dosa.jpg",
        nutrition: {
          calories: 520,
          carbs: "40g",
          protein: "18g",
          fat: "28g",
          sugar: "5g"
        }
      }
    ]
  },
  {
    category: "Uttappa",
    items: [
      { 
        id: 68, 
        name: "Onion Uttappa", 
        price: 65, 
        img: "/images/onion-uttappa.jpg",
        nutrition: {
          calories: 220,
          carbs: "35g",
          protein: "8g",
          fat: "6g",
          sugar: "3g"
        }
      },
      { 
        id: 69, 
        name: "Butter Onion Uttappa", 
        price: 75, 
        img: "/images/butter-onion-uttappa.jpg",
        nutrition: {
          calories: 300,
          carbs: "35g",
          protein: "8g",
          fat: "15g",
          sugar: "3g"
        }
      },
      { 
        id: 70, 
        name: "Cheese Onion Uttappa", 
        price: 90, 
        img: "/images/cheese-onion-uttappa.jpg",
        nutrition: {
          calories: 380,
          carbs: "35g",
          protein: "15g",
          fat: "20g",
          sugar: "3g"
        }
      },
      { 
        id: 71, 
        name: "Butter Cheese Onion Uttappa", 
        price: 100, 
        img: "/images/butter-cheese-onion-uttappa.jpg",
        nutrition: {
          calories: 450,
          carbs: "35g",
          protein: "15g",
          fat: "25g",
          sugar: "3g"
        }
      },
      { 
        id: 72, 
        name: "Tomato Uttappa", 
        price: 65, 
        img: "/images/tomato-uttappa.jpg",
        nutrition: {
          calories: 200,
          carbs: "35g",
          protein: "7g",
          fat: "5g",
          sugar: "4g"
        }
      },
      { 
        id: 73, 
        name: "Butter Onion Tomato Uttappa", 
        price: 80, 
        img: "/images/butter-onion-tomato-uttappa.jpg",
        nutrition: {
          calories: 320,
          carbs: "40g",
          protein: "10g",
          fat: "15g",
          sugar: "6g"
        }
      },
      { 
        id: 74, 
        name: "Butter Cheese Tomato Uttappa", 
        price: 105, 
        img: "/images/butter-cheese-tomato-uttappa.jpg",
        nutrition: {
          calories: 420,
          carbs: "40g",
          protein: "18g",
          fat: "22g",
          sugar: "8g"
        }
      },
      { 
        id: 75, 
        name: "Tomato Uttappa", 
        price: 65, 
        img: "/images/tomato-uttappa.jpg",
        nutrition: {
          calories: 200,
          carbs: "35g",
          protein: "7g",
          fat: "5g",
          sugar: "4g"
        }
      },
      { 
        id: 76, 
        name: "Butter Tomato Uttappa", 
        price: 75, 
        img: "/images/butter-tomato-uttappa.jpg",
        nutrition: {
          calories: 280,
          carbs: "35g",
          protein: "7g",
          fat: "15g",
          sugar: "4g"
        }
      },
      { 
        id: 77, 
        name: "Cheese Tomato Uttappa", 
        price: 90, 
        img: "/images/cheese-tomato-uttappa.jpg",
        nutrition: {
          calories: 350,
          carbs: "35g",
          protein: "15g",
          fat: "18g",
          sugar: "4g"
        }
      },
      { 
        id: 78, 
        name: "Butter Cheese Tomato Uttappa", 
        price: 100, 
        img: "/images/butter-cheese-tomato-uttappa.jpg",
        nutrition: {
          calories: 420,
          carbs: "35g",
          protein: "15g",
          fat: "25g",
          sugar: "4g"
        }
      },
      { 
        id: 49, 
        name: "Plain Uttappa", 
        price: 55, 
        img: "/images/plain-uttappa.jpg",
        nutrition: {
          calories: 180,
          carbs: "35g",
          protein: "6g",
          fat: "3g",
          sugar: "2g"
        }
      },
      { 
        id: 48, 
        name: "Butter Plain Uttappa", 
        price: 65, 
        img: "/images/butter-plain-uttappa.jpg",
        nutrition: {
          calories: 250,
          carbs: "35g",
          protein: "6g",
          fat: "12g",
          sugar: "2g"
        }
      },
      { 
        id: 47, 
        name: "Mix Plain Uttappa", 
        price: 75, 
        img: "/images/mix-plain-uttappa.jpg",
        nutrition: {
          calories: 280,
          carbs: "40g",
          protein: "10g",
          fat: "10g",
          sugar: "4g"
        }
      },
      { 
        id: 46, 
        name: "Butter Cheese Plain Uttappa", 
        price: 95, 
        img: "/images/butter-cheese-plain-uttappa.jpg",
        nutrition: {
          calories: 400,
          carbs: "40g",
          protein: "18g",
          fat: "22g",
          sugar: "4g"
        }
      }
    ]
  },
  {
    category: "Milk Shakes",
    items: [
      { 
        id: 37, 
        name: "Chocolate Shake", 
        price: 40, 
        img: "/images/chocolate-shake.jpg",
        nutrition: {
          calories: 350,
          carbs: "50g",
          protein: "10g",
          fat: "12g",
          sugar: "40g"
        }
      },
      { 
        id: 38, 
        name: "Banana Milk Shake", 
        price: 40, 
        img: "/images/banana-milk-shake.jpg",
        nutrition: {
          calories: 300,
          carbs: "45g",
          protein: "8g",
          fat: "8g",
          sugar: "35g"
        }
      },
      { 
        id: 39, 
        name: "Cold Coffee Milk Shake", 
        price: 45, 
        img: "/images/cold-coffee-milk-shake.jpg",
        nutrition: {
          calories: 280,
          carbs: "35g",
          protein: "8g",
          fat: "10g",
          sugar: "30g"
        }
      },
      { 
        id: 40, 
        name: "Malai Kulfi", 
        price: 35, 
        img: "/images/malai-kulfi.jpg",
        nutrition: {
          calories: 200,
          carbs: "25g",
          protein: "5g",
          fat: "10g",
          sugar: "22g"
        }
      }
    ]
  },
  {
    category: "Extras",
    items: [
      { 
        id: 41, 
        name: "Sambar", 
        price: 10, 
        img: "/images/sambar.jpg",
        nutrition: {
          calories: 50,
          carbs: "8g",
          protein: "3g",
          fat: "1g",
          sugar: "2g"
        }
      },
      { 
        id: 42, 
        name: "Pav Pair", 
        price: 20, 
        img: "/images/pav-pair.jpg",
        nutrition: {
          calories: 150,
          carbs: "25g",
          protein: "5g",
          fat: "3g",
          sugar: "2g"
        }
      },
      { 
        id: 43, 
        name: "Dosa / Idli", 
        price: 10, 
        img: "/images/dosa-idli.jpg",
        nutrition: {
          calories: 30,
          carbs: "5g",
          protein: "1g",
          fat: "0g",
          sugar: "1g"
        }
      },
      { 
        id: 44, 
        name: "Extra Bhaji Plate", 
        price: 50, 
        img: "/images/extra-bhaji-plate.jpg",
        nutrition: {
          calories: 150,
          carbs: "20g",
          protein: "5g",
          fat: "6g",
          sugar: "5g"
        }
      },
      { 
        id: 45, 
        name: "Curd", 
        price: 25, 
        img: "/images/curd.jpg",
        nutrition: {
          calories: 100,
          carbs: "8g",
          protein: "6g",
          fat: "5g",
          sugar: "8g"
        }
      }
    ]
  }
];

const Menu = () => {
  const [cart, setCart] = useState({});
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

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
      const allItems = menuCategories.flatMap((category) => category.items);
      const item = allItems.find((item) => item.id === parseInt(id));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  };

  const handleGoToCart = () => {
    navigate("/cart", { state: { cart, menuCategories } });
  };

  const filteredItems =
    activeCategory === "All"
      ? menuCategories.flatMap((category) => category.items)
      : menuCategories.find((cat) => cat.category === activeCategory)?.items || [];

  return (
    <Container>
      <Header>
        <h1>Menu</h1>
        <CartButton onClick={handleGoToCart}>
          Go to Cart {getCartItemCount() > 0 && <CartCount>{getCartItemCount()}</CartCount>}
        </CartButton>
      </Header>

      <CategoryNav>
        <CategoryButton
          active={activeCategory === "All"}
          onClick={() => setActiveCategory("All")}
        >
          All
        </CategoryButton>
        {menuCategories.map((category) => (
          <CategoryButton
            key={category.category}
            active={activeCategory === category.category}
            onClick={() => setActiveCategory(category.category)}
          >
            {category.category}
          </CategoryButton>
        ))}
      </CategoryNav>

      <ItemsContainer>
        {activeCategory !== "All" && <CategoryTitle>{activeCategory}</CategoryTitle>}

        <ItemsGrid>
          {filteredItems.map((item) => (
            <Item 
              key={item.id}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ItemImage src={item.img} alt={item.name} />
              <ItemInfo>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </ItemInfo>
              <Controls>
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <span>{cart[item.id] || 0}</span>
                <button onClick={() => addToCart(item.id)}>+</button>
              </Controls>
              
              {hoveredItem && hoveredItem.id === item.id && (
                <NutritionOverlay>
                  <NutritionTitle>Nutritional Information</NutritionTitle>
                  <NutritionRow>
                    <span>Calories:</span>
                    <span>{item.nutrition.calories}</span>
                  </NutritionRow>
                  <NutritionRow>
                    <span>Carbs:</span>
                    <span>{item.nutrition.carbs}</span>
                  </NutritionRow>
                  <NutritionRow>
                    <span>Protein:</span>
                    <span>{item.nutrition.protein}</span>
                  </NutritionRow>
                  <NutritionRow>
                    <span>Fat:</span>
                    <span>{item.nutrition.fat}</span>
                  </NutritionRow>
                  <NutritionRow>
                    <span>Sugar:</span>
                    <span>{item.nutrition.sugar}</span>
                  </NutritionRow>
                </NutritionOverlay>
              )}
            </Item>
          ))}
        </ItemsGrid>
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
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
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
  
  ${Item}:hover & {
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