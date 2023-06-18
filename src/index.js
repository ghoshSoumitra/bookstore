import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';

import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import CartItem from "./components/cart/CartItem";
import OrderPlacement from "./components/cart/OrderPlacement";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          
          <Route path = "book" element = {<BookList />} />
          <Route path = "/cart" element = {<CartItem/>} />
          <Route path = "/book/:id" element = {<BookDetails />} />
          <Route path="/order-placement" element={<OrderPlacement />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

