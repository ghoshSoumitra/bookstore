import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const URL = "https://openlibrary.org/search.json?title=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("gitanjali");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false); 

  //adding the items into cartitems array
  const addToCart = useCallback((book) => {
    setCartItems((prevItems) => [...prevItems, book]);
    console.log("Item added to cart:", book);
  }, []);

  const removeFromCart = useCallback((bookId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookId));
    console.log("Item removed from cart:", bookId);
  }, []);

  //fetching the data
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;

      if (docs) {
        const newBooks = docs.slice(0, 20).map((bookSingle) => {
          const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;

          return {
            id: key,
            author: author_name,
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title
          };
        });

        setBooks(newBooks);

        if (newBooks.length > 1) {
          setResultTitle("Your Search Result");
        } else {
          setResultTitle("No Search Result Found!");
        }
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, setBooks, setResultTitle]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  const placeOrder = useCallback(() => {

    // Clear the cart items after successful order placement
    setCartItems([]);
    console.log("Cart items cleared after order placement");
    // Update the orderPlaced state to true
    setOrderPlaced(true); 
  }, [setCartItems, setOrderPlaced]);

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        addToCart,
        removeFromCart,
        cartItems,
        placeOrder,
        orderPlaced
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
