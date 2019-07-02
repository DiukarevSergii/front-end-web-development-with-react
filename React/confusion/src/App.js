import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';

// todo install eslint
function App() {
  return (
      // eslint-disable-next-line
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
      </div>
  );
}

export default App;
