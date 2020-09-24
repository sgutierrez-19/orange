import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getApartmentByAptNum } from '../../../api/apartments';
import moment from 'moment';

import hasFridge from './hasFridge.jpg';
import hasView from './hasView.jpg';
import hasWasher from './hasWasher.png';
import noFridge from './noFridge.png';
import noView from './noView.jpg';
import noWasher from './noWasher.png';

import './style.css';

export default class DetailedView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      apartment: {},
    };
  }

  async componentDidMount() {
    let apt = await getApartmentByAptNum(this.props.apt);
    this.setState({
      apartment: apt,
    });
  }

  render() {
    let apt = this.state.apartment;
    return (
      <Container>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>Apartment #{apt.apartmentNumber}</h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div' xs={12}>
            <img
              className='apt-card-img'
              src='https://www.flaticon.com/premium-icon/icons/svg/1669/1669669.svg'
              alt='apartment icon'
            />
          </Col>
        </Row>
        <Row className='sub-title'>
          <Col className='center-div offset-2 detailed-border' xs={8}>
            <h2>Details</h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-3' xs={2}>
            {apt.hasRefrig ? (
              <img
                className='circle-img'
                src={hasFridge}
                alt='Has Refrigerator'
              />
            ) : (
              <img
                className='circle-img'
                src={noFridge}
                alt='No Refrigerator'
              />
            )}
          </Col>
          <Col className='center-div' xs={2}>
            {apt.hasWashDry ? (
              <img
                className='circle-img'
                src={hasWasher}
                alt='Has Washer and Dryer'
              />
            ) : (
              <img
                className='circle-img'
                src={noWasher}
                alt='No Washer and Dryer'
              />
            )}
          </Col>
          <Col className='center-div' xs={2}>
            {apt.hasView ? (
              <img className='circle-img' src={hasView} alt='Has View' />
            ) : (
              <img className='circle-img' src={noView} alt='No View' />
            )}
          </Col>
        </Row>

        {apt.occupiedBy ? (
          <>
            <Row className='sub-title'>
              <Col className='center-div offset-2 detailed-border' xs={8}>
                <h3>
                  Status:{' '}
                  {apt.occupiedBy.onNotice
                    ? 'Occupied - On Notice'
                    : 'Occupied'}
                </h3>
              </Col>
            </Row>
            <Row>
              {apt.occupiedBy.onNotice ? (
                <>
                  <Col className='center-div offset-2' xs={4}>
                    <p>
                      <b>Move-in:</b>{' '}
                      {moment(apt.occupiedBy.moveIn, [
                        'YYYY-MM-DD',
                        'MMM-DD-YYYY',
                      ]).format('MMM D, YYYY')}
                    </p>
                  </Col>
                  <Col className='center-div' xs={4}>
                    <p>
                      <b>Expected Move-out:</b>{' '}
                      {moment(apt.occupiedBy.expectedMoveOut, [
                        'YYYY-MM-DD',
                        'MMM-DD-YYYY',
                      ]).format('MMM D, YYYY')}
                    </p>
                  </Col>
                </>
              ) : (
                <Col className='center-div' xs={12}>
                  <p>
                    <b>Move-in:</b>{' '}
                    {moment(apt.occupiedBy.moveIn, [
                      'YYYY-MM-DD',
                      'MMM-DD-YYYY',
                    ]).format('MMM D, YYYY')}
                  </p>
                </Col>
              )}
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <h5>Occupant(s):</h5>
              </Col>
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <ul>
                  {apt.occupiedBy.residents.map((r: any) => {
                    return (
                      <li key={r.residentId}>
                        {r.firstName} {r.lastName}
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}

        {apt.reservedBy ? (
          <>
            <Row className='sub-title'>
              <Col className='center-div offset-2 detailed-border' xs={8}>
                <h3>Status: Reserved</h3>
              </Col>
            </Row>
            <Row>
              <Col className='center-div offset-2' xs={4}>
                <p>
                  <b>Expected Move-in:</b>{' '}
                  {moment(apt.reservedBy.expectedMoveIn, [
                    'YYYY-MM-DD',
                    'MMM-DD-YYYY',
                  ]).format('MMM D, YYYY')}
                </p>
              </Col>
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <h5>Future Tenant(s):</h5>
              </Col>
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <ul>
                  {apt.reservedBy.residents.map((r: any) => {
                    return (
                      <li key={r.residentId}>
                        {r.firstName} {r.lastName}
                      </li>
                    );
                  })}
                </ul>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}

        {!apt.reservedBy && !apt.occupiedBy ? (
          <Row>
            <Col className='center-div offset-2 detailed-border' xs={8}>
              <h3>Status: Unoccupied - Unreserved</h3>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Container>
    );
  }
}
