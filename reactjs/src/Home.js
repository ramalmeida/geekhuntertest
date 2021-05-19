// eslint-disable-next-line
import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Button, Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container home>
          <img src="../logo512.png" alt=""/>
            <Button color="primary" href="/customers"> Lista de pessoas </Button>
        </Container>
      </div>
    );
  }
}

export default Home;