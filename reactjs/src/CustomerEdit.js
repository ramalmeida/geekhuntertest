import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class CustomerEdit extends Component {

  emptyCustomer = {
    firstname: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyCustomer
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      const customer = await (await fetch(`/api/customer/${this.props.match.params.id}`)).json();
      this.setState({item: customer});
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/api/customer', {
      method: (item.id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/customers');
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.id ? 'Editar pessoa' : 'Adicionar pessoa'}</h2>;

    return <div>
      <AppNavbar/>
      <Container fluid>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="firstname">Nome</Label>
            <Input type="text" name="firstname" id="firstname" value={item.firstname || ''}
                   onChange={this.handleChange} autoComplete="firstname"/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Salvar</Button>{' '}
            <Button color="secondary" tag={Link} to="/customers">Cancelar</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(CustomerEdit);