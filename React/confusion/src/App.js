import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import './App.css';
import createDishes from './shared/dishes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
    };
  }

  componentDidMount() {
    createDishes.then((result) => {
      this.setState({
        dishes: result,
      });
    });
  }

  render() {
    const { dishes } = this.state;

    if (dishes) {
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
    return <div />;
  }
}

export default App;
