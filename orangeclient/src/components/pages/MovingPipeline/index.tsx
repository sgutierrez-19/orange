import React from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from 'reactstrap';
import {
  getApartmentByAptNum,
  giveNotice,
  moveIn,
  moveOut,
} from '../../../api/apartments';
import { getHousehold } from '../../../api/households';
import moment from 'moment';

export default class MovingPipeline extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      household: [],
      apt: [],
      selDate: '',
      alertVis: false,
      alertMessage: '',
    };
  }

  async componentDidMount() {
    if (this.props.path.substr(1, 6) === 'move-i') {
      let hh = await getHousehold(this.props.hh);
      let apt = await getApartmentByAptNum(hh.reserving.apartmentNumber);
      this.setState({
        household: hh,
        apt: apt,
        // selDate: hh.expectedMoveIn,
      });
    } else if (this.props.path.substr(1, 6) === 'give-n') {
      let hh = await getHousehold(this.props.hh);
      let apt = await getApartmentByAptNum(hh.occupying.apartmentNumber);
      this.setState({
        household: hh,
        apt: apt,
      });
    } else if (this.props.path.substr(1, 6) === 'move-o') {
      let hh = await getHousehold(this.props.hh);
      let apt = await getApartmentByAptNum(hh.occupying.apartmentNumber);
      this.setState({
        household: hh,
        apt: apt,
        // selDate: hh.expectedMoveOut,
      });
    } else {
    }
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  setSelDate = (e: any) => {
    this.setState({
      selDate: e.target.value,
    });
  };

  moveIn = async (e: any) => {
    e.preventDefault();
    if (this.state.selDate > moment().format('YYYY-MM-DD')) {
      this.setState({
        alertVis: true,
        alertMessage: 'You can not move a household in with a future date.',
      });
    } else if (this.state.apt.occupiedBy) {
      this.setState({
        alertVis: true,
        alertMessage:
          'You cannot move in a household to an apartment that is currently occupied.',
      });
    } else {
      await moveIn(
        this.state.apt.apartmentNumber,
        this.state.household.householdId,
        this.state.selDate
      );
      this.props.history.push({
        pathname: '/residents',
        state: {
          view: 'current',
          message: `Apartment ${this.state.apt.apartmentNumber} has now moved in.`,
        },
      });
    }
  };

  giveNotice = async (e: any) => {
    e.preventDefault();
    if (this.state.selDate > moment().add(2, 'M').format('YYYY-MM-DD')) {
      this.setState({
        alertVis: true,
        alertMessage:
          'You cannot give notice for an apartment over 60 days in advance.',
      });
    } else if (this.state.selDate < moment().add(1, 'M').format('YYYY-MM-DD')) {
      this.setState({
        alertVis: true,
        alertMessage: 'Household must fufill a 30 day notice',
      });
    } else {
      await giveNotice(
        this.state.apt.apartmentNumber,
        this.state.household.householdId,
        this.state.selDate
      );
      this.props.history.push({
        pathname: '/residents',
        state: {
          view: 'current',
          message: `Apartment ${
            this.state.apt.apartmentNumber
          } is now on-notice with an expected ${moment(this.state.selDate, [
            'YYYY-MM-DD',
            'MMM-DD-YYYY',
          ]).format('MMM D, YYYY')} move out date.`,
        },
      });
    }
  };

  moveOut = async (e: any) => {
    e.preventDefault();
    if (this.state.selDate > moment().format('YYYY-MM-DD')) {
      this.setState({
        alertVis: true,
        alertMessage: 'You cannot move someone out with a future date.',
      });
    } else if (
      this.state.selDate <
      moment(this.state.household.expectedMoveOut).format('YYYY-MM-DD')
    ) {
      await moveOut(
        this.state.apt.apartmentNumber,
        this.state.household.householdId,
        this.state.selDate
      );
      let today = moment();
      let notice = moment(this.state.household.expectedMoveOut);
      this.props.history.push({
        pathname: '/residents',
        state: {
          view: 'past',
          message: `Apartment ${
            this.state.apt.apartmentNumber
          } has moved out as of ${moment(this.state.selDate, [
            'YYYY-MM-DD',
            'MMM-DD-YYYY',
          ]).format(
            'MMM D, YYYY'
          )}.  Please note, household is still rent responsible until ${moment(
            this.state.household.expectedMoveOut,
            ['YYYY-MM-DD', 'MMM-DD-YYYY']
          ).format('MMM D, YYYY')} (${
            today.diff(notice, 'days') * -1 + 1
          } more days) `,
        },
      });
    } else {
      await moveOut(
        this.state.apt.apartmentNumber,
        this.state.household.householdId,
        this.state.selDate
      );
      this.props.history.push({
        pathname: '/residents',
        state: {
          view: 'past',
          message: `Apartment ${
            this.state.apt.apartmentNumber
          } has moved out as of ${moment(this.state.selDate, [
            'YYYY-MM-DD',
            'MMM-DD-YYYY',
          ]).format('MMM D, YYYY')}.`,
        },
      });
    }
  };

  render() {
    return (
      <Container>
        {this.props.path.substr(1, 6) === 'move-i' ? (
          <>
            <Row className='title-row'>
              <Col className='center-div offset-3' xs={6}>
                <h2>Move in Residents</h2>
              </Col>
            </Row>
            <Row className='title-row'>
              <Col className='center-div offset-3' xs={6}>
                <h5>Please confirm the household's move in date:</h5>
              </Col>
            </Row>
            <Row>
              <Col className='center-div offset-3' xs={6}>
                <Alert
                  color='danger'
                  toggle={this.toggle}
                  isOpen={this.state.alertVis}
                >
                  {this.state.alertMessage}
                </Alert>
              </Col>
            </Row>
            <Form onSubmit={this.moveIn}>
              <FormGroup row>
                <Label xs={3} className='offset-3' for='exampleDate'>
                  Move Date:
                </Label>
                <Col xs={3}>
                  <Input
                    onChange={this.setSelDate}
                    value={this.state.selDate}
                    defaultValue={this.state.household.expectedMoveIn}
                    type='date'
                    name='date'
                    id='exampleDate'
                    placeholder='date placeholder'
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className='offset-5' xs={2}>
                  <Button>Move In</Button>
                </Col>
              </FormGroup>
            </Form>
          </>
        ) : (
          [
            this.props.path.substr(1, 6) === 'give-n' ? (
              <>
                <Row className='title-row'>
                  <Col className='center-div offset-3' xs={6}>
                    <h2>Give Notice Resident(s)</h2>
                  </Col>
                </Row>
                <Row className='title-row'>
                  <Col className='center-div offset-3' xs={6}>
                    <h5>
                      Please enter the household's expected move-out date:
                    </h5>
                  </Col>
                </Row>
                <Row>
                  <Col className='center-div offset-3' xs={6}>
                    <Alert
                      color='danger'
                      toggle={this.toggle}
                      isOpen={this.state.alertVis}
                    >
                      {this.state.alertMessage}
                    </Alert>
                  </Col>
                </Row>
                <Form onSubmit={this.giveNotice}>
                  <FormGroup row>
                    <Label xs={3} className='offset-3' for='exampleDate'>
                      Move out Date:
                    </Label>
                    <Col xs={3}>
                      <Input
                        onChange={this.setSelDate}
                        value={this.state.selDate}
                        defaultValue={this.state.household.expectedMoveIn}
                        type='date'
                        name='date'
                        id='exampleDate'
                        placeholder='date placeholder'
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col className='offset-5' xs={2}>
                      <Button>Give Notice</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </>
            ) : (
              [
                this.props.path.substr(1, 6) === 'move-o' ? (
                  <>
                    <Row className='title-row'>
                      <Col className='center-div offset-3' xs={6}>
                        <h2>Move Out Resident(s)</h2>
                      </Col>
                    </Row>
                    <Row className='title-row'>
                      <Col className='center-div offset-3' xs={6}>
                        <h5>Please confirm the household's move-out date:</h5>
                      </Col>
                    </Row>
                    <Row className='title-row'>
                      <Col className='center-div offset-3' xs={6}>
                        <p>
                          Expected Move Out:{' '}
                          {moment(this.state.household.expectedMoveOut, [
                            'YYYY-MM-DD',
                            'MMM-DD-YYYY',
                          ]).format('MMM D, YYYY')}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='center-div offset-3' xs={6}>
                        <Alert
                          color='danger'
                          toggle={this.toggle}
                          isOpen={this.state.alertVis}
                        >
                          {this.state.alertMessage}
                        </Alert>
                      </Col>
                    </Row>
                    <Form onSubmit={this.moveOut}>
                      <FormGroup row>
                        <Label xs={3} className='offset-3' for='exampleDate'>
                          Move out Date:
                        </Label>
                        <Col xs={3}>
                          <Input
                            onChange={this.setSelDate}
                            value={this.state.selDate}
                            defaultValue={this.state.household.expectedMoveOut}
                            type='date'
                            name='date'
                            id='exampleDate'
                            placeholder='date placeholder'
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col className='offset-5' xs={2}>
                          <Button>Move Out</Button>
                        </Col>
                      </FormGroup>
                    </Form>
                  </>
                ) : (
                  <></>
                ),
              ]
            ),
          ]
        )}
      </Container>
    );
  }
}
