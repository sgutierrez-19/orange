import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './components/pages/Home';

export class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Router>
        <NavBar />
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Router>
    );
  }
}

export default App;
