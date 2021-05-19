import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import Costumers from './CustomerList';
import App from './App';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

jest.mock('./App');

test('Valid path and load', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Home)).toHaveLength(0);
  expect(wrapper.find(Costumers)).toHaveLength(0);
});