import React from 'react';
import './App.css';
import { NavBar } from './components/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { HomePage } from './components/pages/Home';
import Residents from './components/pages/Residents';
import Apartments from './components/pages/Apartments';
import Prospects from './components/pages/Prospects';
import DetailedView from './components/pages/DetailedView';

export class App extends React.Component<any, any> {
  // constructor(props: any) {
  //   super(props);
  // }
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>

          <Route path='/residents'>
            <Residents />
          </Route>

          <Route path='/apartments'>
            <Apartments />
          </Route>

          <Route path='/prospects'>
            <Prospects />
          </Route>

          <Route path='/details'>
            <DetailedView />
          </Route>
          {/* <Route exact path='/*'>
          <Redirect to='/' />
        </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
