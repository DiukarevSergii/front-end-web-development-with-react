import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';
import createDishes from './shared/dishes';

class App extends Component {
  constructor(props) {
    super(props);

    // console.log('in App', DISHES);
    createDishes().then((exportDishes) => {
      console.log('exportDishes', exportDishes);

      this.state = {
        dishes: exportDishes,
      };
    });
  }

  render() {
    const { dishes } = this.state;


    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={dishes} />
      </div>
    );
  }
}

export default App;
