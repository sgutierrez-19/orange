// import Button from 'react-bootstrap/Button';
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getAllApartments, getAvailApartments } from '../../../api/apartments';
import { Link } from 'react-router-dom';
import AptCard from '../../AptCard';

export class HomePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      occupancy: 0,
      availability: 0,
      total: undefined,
      avail: undefined,
    };
  }

  async componentDidMount() {
    let all = await getAllApartments();
    let avail = await getAvailApartments();
    let occCount: number = 0;
    console.log('all: ', all);
    for (let i = 0; i < all.length; i++) {
      if (all[i].occupiedBy) {
        occCount++;
      }
    }
    this.setState({
      occupancy: (occCount / all.length) * 100,
      availability: (avail.length / all.length) * 100,
      total: all,
      avail: avail,
    });
  }

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>Management Dashboard</h2>
          </Col>
        </Row>
        <Row className='content-row'>
          <Col className='at-a-glance' md={8} xs={12}>
            <Row>
              <Col className='available-apts-div ' xs={12}>
                {this.state.avail &&
                  this.state.avail.map((a: any) => {
                    return <AptCard key={a.id} apt={a} />;
                  })}
              </Col>
            </Row>
          </Col>
          <Col className='shortcut-menu' md={4} xs={12}>
            <Row>
              <Col className='center-div shortcut-menu-title' xs={12}>
                <h4>Shortcuts</h4>
              </Col>
            </Row>
            <div className='glance-div'>
              <Row>
                <Col className='center-div' xs={12}>
                  <h5>Property Pulse</h5>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <ul>
                    <li>Occupancy: {this.state.occupancy}%</li>
                    <li>Availability: {this.state.availability}%</li>
                  </ul>
                </Col>
              </Row>
            </div>
            <Row>
              <Col className='subbb' xs={12}>
                <Link to='/something'>soemthing</Link>
                <br />
                <Link to='/something'>soemthing</Link>
                <br />
                <Link to='/something'>soemthing</Link>
                <br />
                <Link to='/something'>soemthing</Link>
                <br />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
