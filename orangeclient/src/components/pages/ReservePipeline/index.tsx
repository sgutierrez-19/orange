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
import { getAvailApartments, reserveApt } from '../../../api/apartments';
import { getHousehold } from '../../../api/households';
import moment from 'moment';

export default class ReservePipeline extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      household: [],
      avail: [],
      selApt: '',
      selDate: '',
      alertVis: false,
      alertMessage: '',
    };
  }

  async componentDidMount() {
    let hh = await getHousehold(this.props.hh);
    let avail = await getAvailApartments();
    if (avail.length > 0) {
      this.setState({
        household: hh,
        avail: avail,
        selApt: avail[0].apartmentNumber,
      });
    } else {
      this.setState({
        household: hh,
      });
    }
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  setSelApt = (e: any) => {
    e.preventDefault();
    this.setState({
      selApt: e.target.value,
    });
  };

  setSelDate = (e: any) => {
    e.preventDefault();
    this.setState({
      selDate: e.target.value,
    });
  };

  reserve = async (e: any) => {
    e.preventDefault();
    let apt = this.state.avail.find(
      (e: any) => e.apartmentNumber === this.state.selApt
    );
    if (this.state.selApt == null || this.state.selDate == null) {
      this.setState({
        alertVis: true,
        alertMessage: 'Please select an apartment and a date.',
      });
    } else if (
      apt.occupiedBy &&
      moment(apt.occupiedBy.expectedMoveOut, ['YYYY-MM-DD', 'MMM-DD-YYYY'])
        .add(7, 'd')
        .format('YYYY-MM-DD') > this.state.selDate
    ) {
      this.setState({
        alertVis: true,
        alertMessage: `Move in date must be ${moment(
          apt.occupiedBy.expectedMoveOut,
          ['YYYY-MM-DD', 'MMM-DD-YYYY']
        )
          .add(7, 'd')
          .format('MMM D, YYYY')} or later`,
      });
    } else if (this.state.selDate < moment().format('YYYY-MM-DD')) {
      this.setState({
        alertVis: true,
        alertMessage: `Selected Move in date must be for ${moment().format(
          'MM-DD-YYYY'
        )} or later.`,
      });
    } else {
      await reserveApt(
        this.state.selApt,
        this.state.household.householdId,
        this.state.selDate
      );
      this.props.history.push({
        pathname: '/residents',
        state: {
          view: 'future',
          message: `Apartment ${
            this.state.selApt
          } was reserved with an expected ${moment(this.state.selDate, [
            'YYYY-MM-DD',
            'MMM-DD-YYYY',
          ]).format('MMM D, YYYY')} move in date.`,
        },
      });
    }
  };

  render() {
    return (
      <Container>
        <Row className='title-row'>
          <Col className='center-div offset-3' xs={6}>
            <h2>Reserve Apartment</h2>
          </Col>
        </Row>
        {this.state.avail.length > 0 ? (
          <>
            <Row className='title-row'>
              <Col className='center-div offset-3' xs={6}>
                <h5>Please select an apartment and the move in date:</h5>
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
            <Form onSubmit={this.reserve}>
              <FormGroup row>
                <Label xs={1} className='offset-2' for='aptSelect'>
                  Apartment:
                </Label>
                <Col xs={2}>
                  <Input
                    onChange={this.setSelApt}
                    value={this.state.selApt}
                    type='select'
                    name='select'
                    id='aptSelect'
                  >
                    {this.state.avail.map((a: any) => {
                      return (
                        <option value={a.apartmentNumber} key={a.apartmentId}>
                          {a.apartmentNumber}
                        </option>
                      );
                    })}
                  </Input>
                </Col>
                <Label xs={2} for='exampleDate'>
                  Move Date:
                </Label>
                <Col xs={3}>
                  <Input
                    onChange={this.setSelDate}
                    value={this.state.selDate}
                    type='date'
                    name='date'
                    id='exampleDate'
                    placeholder='date placeholder'
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className='offset-5' xs={2}>
                  <Button>Submit</Button>
                </Col>
              </FormGroup>
            </Form>
            <Row className='center-div content-row'>
              <Col className='at-a-glance' md={8} xs={12}>
                <Row>
                  <Col className='available-apts-div ' xs={12}>
                    <ul>
                      {this.state.avail.map((a: any) => {
                        return (
                          <li key={a.apartmentId}>
                            Apt #{a.apartmentNumber} -- Available{' '}
                            {a.occupiedBy
                              ? moment(a.occupiedBy.expectedMoveOut, [
                                  'YYYY-MM-DD',
                                  'MMM-DD-YYYY',
                                ])
                                  .add(7, 'd')
                                  .format('MMM D, YYYY')
                              : 'now'}
                          </li>
                        );
                      })}
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <h3>There are currently no apartments available to reserve</h3>
        )}
      </Container>
    );
  }
}
