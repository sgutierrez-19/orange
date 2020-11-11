import React from 'react';
import { Container, Row, Col, Table, Button, Alert } from 'reactstrap';

import './style.css';
import { ResRow } from '../../ResRow';
import {
  getCurrentRes,
  getPastRes,
  getFutureRes,
} from '../../../api/residents';

export class Residents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      residentList: null,
      view: 'current',
      redirectAlert: false,
      redirectAlertMessage: '',
    };
  }

  async componentDidMount() {
    if (!this.props.location.state) {
      let current = await getCurrentRes();
      this.setState({
        residentList: current.sort(this.compareAptNum),
      });
    } else {
      switch (this.props.location.state.view) {
        case 'past':
          let past = await getPastRes();
          this.setState({
            residentList: past.sort(this.compareAptNum),
            view: this.props.location.state.view,
            redirectAlert: true,
            redirectAlertMessage: this.props.location.state.message,
          });
          break;
        case 'future':
          let future = await getFutureRes();
          this.setState({
            residentList: future.sort(this.compareAptNum),
            view: this.props.location.state.view,
            redirectAlert: true,
            redirectAlertMessage: this.props.location.state.message,
          });
          break;
        case 'current':
          let current = await getCurrentRes();
          this.setState({
            residentList: current.sort(this.compareAptNum),
            view: this.props.location.state.view,
            redirectAlert: true,
            redirectAlertMessage: this.props.location.state.message,
          });
          break;
        default:
          break;
      }
    }
  }

  toggle = (e: any) => {
    this.setState({
      redirectAlert: false,
    });
  };

  compareLastName = (a: any, b: any) => {
    if (a.lastName < b.lastName) {
      return -1;
    } else if (a.lastName > b.lastName) {
      return 1;
    } else {
      return 0;
    }
  };

  compareAptNum = (a: any, b: any) => {
    if (a.householdId.occupying && a.householdId.occupying.apartmentNumber) {
      if (
        a.householdId.occupying.apartmentNumber <
        b.householdId.occupying.apartmentNumber
      ) {
        return -1;
      } else if (
        a.householdId.occupying.apartmentNumber >
        b.householdId.occupying.apartmentNumber
      ) {
        return 1;
      } else {
        return 0;
      }
    } else if (
      a.householdId.reserving &&
      a.householdId.reserving.apartmentNumber
    ) {
      if (
        a.householdId.reserving.apartmentNumber <
        b.householdId.reserving.apartmentNumber
      ) {
        return -1;
      } else if (
        a.householdId.reserving.apartmentNumber >
        b.householdId.reserving.apartmentNumber
      ) {
        return 1;
      } else {
        return 0;
      }
    }
  };

  findCurrent = async () => {
    let current = await getCurrentRes();
    this.setState({
      residentList: current.sort(this.compareAptNum),
      view: 'current',
    });
  };

  findPast = async () => {
    let past = await getPastRes();

    this.setState({
      residentList: past.sort(this.compareAptNum),
      view: 'past',
    });
  };

  findFuture = async () => {
    let future = await getFutureRes();
    this.setState({
      residentList: future,
      view: 'future',
    });
  };

  renderHeader = (view: any) => {
    switch (view) {
      case 'current':
        return (
          <tr>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Apartment #</th>
            <th style={{ textAlign: 'center' }}>Move In Date</th>
            <th style={{ textAlign: 'center' }}>Expected Move Out</th>
          </tr>
        );
      case 'future':
        return (
          <tr>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Apartment #</th>
            <th style={{ textAlign: 'center' }}>Expected Move In</th>
          </tr>
        );
      case 'past':
        return (
          <tr>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Apartment #</th>
            <th style={{ textAlign: 'center' }}>Move out Date</th>
          </tr>
        );
      default:
        return <></>;
    }
  };
  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>
              {this.state.view === 'current'
                ? 'Current'
                : [this.state.view === 'past' ? 'Past' : 'Future']}{' '}
              Resident Dashboard
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-2' xs={8}>
            <Alert
              color='success'
              toggle={this.toggle}
              isOpen={this.state.redirectAlert}
            >
              {this.state.redirectAlertMessage}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col className='center-div search-bar offset-2' xs={2}>
            <Button onClick={this.findCurrent}>Current</Button>
          </Col>
          <Col className='center-div search-bar offset-2' xs={2}>
            <Button onClick={this.findPast}>Past</Button>
          </Col>
          <Col className='center-div search-bar offset-2' xs={2}>
            <Button onClick={this.findFuture}>Future</Button>
          </Col>
        </Row>
        <Row>
          <Col className='center-div' xs={12}>
            <Table hover bordered striped>
              <thead>{this.renderHeader(this.state.view)}</thead>
              <tbody>
                {this.state.residentList ? (
                  this.state.residentList.map((r: any) => {
                    return <ResRow key={r.residentId} resident={r} />;
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Residents;
