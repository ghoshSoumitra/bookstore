import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context.';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderPlacement = () => {
  const { placeOrder, orderPlaced, cartItems } = useGlobalContext();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderPlaced && isFormSubmitted) {
      // Show success notification
      toast.success('Order placed successfully!', {
        position: toast.POSITION.TOP_RIGHT
      });

      // Reset the form fields
      setName('');
      setAddress('');
      setPaymentMethod('UPI');

      // Redirect to the home page after a delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [orderPlaced, navigate, isFormSubmitted]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process the order and perform any necessary actions
    // You can access the form data (name, address, paymentMethod) here and send it to your backend for further processing
    console.log('Form submitted:', { name, address, paymentMethod, cartItems });

    // Clear cart items
    placeOrder();

    // Set the form submission flag
    setIsFormSubmitted(true);
  };

  return (
    <div>
      <h2>Place Your Order Here:</h2>
      <ToastContainer />
   
      <form onSubmit={handleFormSubmit} className='form-container'>
        {/* Form fields */}
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className='input'/>
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required className='input'></textarea>
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className='input'>
            <option value="UPI">UPI</option>
            <option value="COD">COD</option>
            <option value="Debit Card">Debit Card</option>
           
          </select>
        </div>
        <div className='input'>
          <p>Items in Cart:</p>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderPlacement;
