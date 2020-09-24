import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { getRes } from '../../../api/residents';
import { getHousehold } from '../../../api/households';
import moment from 'moment';

import './style.css';

export default class ResView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      resident: {},
      household: {},
      roommates: [],
    };
  }

  async componentDidMount() {
    let res = await getRes(this.props.res);
    let hh = await getHousehold(res.householdId.householdId);
    if (hh.residents.length > 1) {
      let resId = res.residentId;
      let roommateArr = [];
      for (let i = 0; i < hh.residents.length; i++) {
        let rmId = hh.residents[i].residentId;
        if (rmId !== resId) {
          roommateArr.push(hh.residents[i]);
        }
      }
      this.setState({
        resident: res,
        household: hh,
        roommates: roommateArr,
      });
    } else {
      this.setState({
        resident: res,
        household: hh,
      });
    }
  }

  goToReserve = () => {
    this.props.history.push(`/}`);
  };

  render() {
    let res = this.state.resident;
    return (
      <Container>
        <Row className='title-row'>
          <Col className='center-div offset-3' xs={6}>
            <h2>
              {res.firstName} {res.lastName}
            </h2>
          </Col>
          {this.state.household.isProspect ? (
            <Col className='center-div' xs={3}>
              <NavLink to={`/reserve/${this.state.household.householdId}`}>
                <Button color='success'>Reserve Apt</Button>
              </NavLink>
            </Col>
          ) : (
            [
              this.state.household.isFuture ? (
                <>
                  <Col className='center-div' xs={3}>
                    <NavLink
                      to={`/move-in/${this.state.household.householdId}`}
                    >
                      <Button color='success'>Move In</Button>
                    </NavLink>
                  </Col>
                </>
              ) : (
                [
                  this.state.household.onNotice ? (
                    <>
                      <Col className='center-div' xs={3}>
                        <NavLink
                          to={`/move-out/${this.state.household.householdId}`}
                        >
                          <Button color='warning'>Move Out</Button>
                        </NavLink>
                      </Col>
                    </>
                  ) : (
                    <>
                      <Col className='center-div' xs={3}>
                        <NavLink
                          to={`/give-notice/${this.state.household.householdId}`}
                        >
                          <Button color='success'>Give Notice</Button>
                        </NavLink>
                      </Col>
                    </>
                  ),
                ]
              ),
            ]
          )}
        </Row>
        <Row>
          <Col className='center-div' xs={12}>
            <img
              className='res-card-img'
              src='https://previews.123rf.com/images/salamatik/salamatik1801/salamatik180100019/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg'
              alt='apartment icon'
            />
          </Col>
        </Row>
        <Row className='sub-title'>
          <Col className='center-div offset-2 detailed-border' xs={8}>
            <h2>
              {this.state.household.isProspect
                ? 'Prospect Info'
                : [
                    this.state.household.isPast
                      ? 'Past Resident Info'
                      : 'Resident Info',
                  ]}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-2' xs={4}>
            <p>
              <b>Phone: </b> {res.phoneNumber}
            </p>
          </Col>
          <Col className='center-div' xs={4}>
            <p>
              <b>Address</b> {res.currAddress} {res.currCity}, {res.currState}{' '}
              {res.currZip}
            </p>
          </Col>
        </Row>
        {this.state.roommates.length > 0 ? (
          <>
            <Row>
              <Col className='center-div' xs={12}>
                <h5>Roommate(s):</h5>
              </Col>
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <ul>
                  {this.state.roommates.map((r: any) => {
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
        {this.state.household.occupying ? (
          <>
            <Row className='sub-title'>
              <Col className='center-div offset-2 detailed-border' xs={8}>
                <h3>
                  Occupying Apartment #
                  {this.state.household.occupying.apartmentNumber}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <h5>
                  Moved In:{' '}
                  {moment(this.state.household.moveIn, [
                    'YYYY-MM-DD',
                    'MMM-DD-YYYY',
                  ]).format('MMM D, YYYY')}
                </h5>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
        {this.state.household.reserving ? (
          <>
            <Row className='sub-title'>
              <Col className='center-div offset-2 detailed-border' xs={8}>
                <h3>
                  Reserving Apartment #
                  {this.state.household.reserving.apartmentNumber}
                </h3>
              </Col>
            </Row>
            <Row>
              <Col className='center-div' xs={12}>
                <h5>
                  Expected Move In:{' '}
                  {moment(this.state.household.expectedMoveIn, [
                    'YYYY-MM-DD',
                    'MMM-DD-YYYY',
                  ]).format('MMM D, YYYY')}
                </h5>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
      </Container>
    );
  }
}
