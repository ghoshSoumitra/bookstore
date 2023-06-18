import React from 'react';
import { useGlobalContext } from '../../context.';
import "../BookList/BookList.css";
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart } = useGlobalContext();

    const handleRemoveFromCart = (bookId) => {
      removeFromCart(bookId);
    };
  console.log("Cart Items:", cartItems);
  console.log("CartPage rendered");
  return (
    <div>
      <h2>Cart Items</h2>
      <Link to="/order-placement" className='placeorder'>Place Order</Link>
      {cartItems.length > 0 ? (
        <ul className='list'>
          {cartItems.map((item) => (
            <li key={item.id} >
                <div className='book-item flex flex-column flex-sb'>
                <div className='book-item-img'>
                <img src={item.cover_img} alt="Book Cover"  />
                </div>
              
              <div>
                <h3>{item.title}</h3>
                <p>Author: {item.author}</p>
                <p>Published Year: {item.first_publish_year}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)} className='removecart'>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    
    </div>
  );
};

export default CartPage;
