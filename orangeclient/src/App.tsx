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
import ResView from './components/pages/ResView';
import ReservePipeline from './components/pages/ReservePipeline';
import MovingPipeline from './components/pages/MovingPipeline';

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

          <Route
            path='/residents'
            render={(props: any) => {
              return <Residents {...props} />;
            }}
          />

          <Route path='/apartments'>
            <Apartments />
          </Route>

          <Route path='/prospects'>
            <Prospects />
          </Route>
          <Route
            path='/reserve/:householdId'
            render={(match: any) => {
              return (
                <ReservePipeline
                  {...match}
                  hh={match.match.params.householdId}
                  path={`/reserve/${match.match.params.householdId}`}
                />
              );
            }}
          ></Route>
          <Route
            path='/move-in/:householdId'
            render={(match: any) => {
              return (
                <MovingPipeline
                  {...match}
                  hh={match.match.params.householdId}
                  path={`/move-in/${match.match.params.householdId}`}
                />
              );
            }}
          ></Route>
          <Route
            path='/give-notice/:householdId'
            render={(match: any) => {
              return (
                <MovingPipeline
                  {...match}
                  hh={match.match.params.householdId}
                  path={`/give-notice/${match.match.params.householdId}`}
                />
              );
            }}
          ></Route>

          <Route
            path='/move-out/:householdId'
            render={(match: any) => {
              return (
                <MovingPipeline
                  {...match}
                  hh={match.match.params.householdId}
                  path={`/move-out/${match.match.params.householdId}`}
                />
              );
            }}
          ></Route>
          <Route
            path={'/details/redirect/:apartmentId'}
            render={(match: any) => {
              return (
                <Redirect to={`/details/${match.match.params.apartmentId}`} />
              );
            }}
          />
          <Route
            path='/details/:apartmentId'
            render={(match: any) => {
              return (
                <DetailedView
                  apt={match.match.params.apartmentId}
                  path={`/details/${match.match.params.apartmentId}`}
                />
              );
            }}
          />
          <Route
            path={'/res-details/redirect/:resId'}
            render={(match: any) => {
              return (
                <Redirect to={`/res-details/${match.match.params.resId}`} />
              );
            }}
          />
          <Route
            path='/res-details/:resId'
            render={(match: any) => {
              return (
                <ResView
                  history={this.props.history}
                  res={match.match.params.resId}
                  path={`/details/${match.match.params.resId}`}
                />
              );
            }}
          />
          {/* <Route exact path='/*'>
          <Redirect to='/' />
        </Route> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
