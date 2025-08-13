import { createContext, useState, useContext } from "react";

const CartContext = createContext();

function useCart() {
  return useContext(CartContext);
}
export { useCart };

// Provider
function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size) => {
    if (quantity > 0) {
      setCart((prevCart) => {
        const existingPrIndex = prevCart.findIndex(
          (item) => item.name === product.name && item.description === product.description
        );

        if (existingPrIndex !== -1) {
          // If found, update the quantity
          return prevCart.map((item, index) =>
            index === existingPrIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          return [...prevCart, { ...product, quantity, size }];
        }
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
