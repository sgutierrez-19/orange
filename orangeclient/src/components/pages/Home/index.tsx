// import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getAvailableApartments } from '../../../api/apartments';
import { AxiosResponse } from 'axios';

export class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      avail: null,
    };
  }

  async componentDidMount() {
    let response = await getAvailableApartments();
    console.log('in getAvailable: ', response);
    this.setState({
      avail: response,
    });
  }

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='sub-title' xs={12}>
            <h2>Management Dashboard</h2>
          </Col>
        </Row>
        <Row className='content-row'>
          <Col className='at-a-glance sub-title' md={8} xs={12}>
            <div className='glance-div'>
              <Row>
                <Col className='sub-title' md={4} xs={12}>
                  <h5>Property Pulse</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <ul>
                    <li>Occupancy: 75%</li>
                    <li>Availability: 25%</li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Col>
          <Col className='shortcut-menu' xs={4}>
            {this.state.avail &&
              this.state.avail.map((a: any) => {
                console.log(a);
              })}
          </Col>
        </Row>
      </Container>
    );
  }
}
