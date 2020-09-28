import React from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { newHousehold } from '../../../api/households';
import { newResident } from '../../../api/residents';

export class NewProspect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      resArr: [],
      expMoveIn: '',
      alertVis: false,
      alertMessage: '',
    };
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  addRow = () => {
    this.setState({
      resArr: [
        ...this.state.resArr,
        {
          firstName: '',
          lastName: '',
          currAddress: '',
          currCity: '',
          currState: '',
          currZip: '',
          phoneNumber: '',
        },
      ],
    });
  };

  removeRow = (index: number) => {
    const updatedArr = this.state.resArr;
    updatedArr.splice(index, 1);
    this.setState({
      resArr: updatedArr,
    });
  };

  handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const updatedArr = this.state.resArr;
    updatedArr[index] = { ...updatedArr[index], [name]: value };
    this.setState({
      resArr: updatedArr,
    });
  };

  handleDate = (e: any) => {
    this.setState({
      expMoveIn: e.target.value,
    });
  };

  resInput = (resForm: any, index: number) => {
    return (
      <div className='form-border' key={index}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for='firstName'>First Name</Label>
              <Input
                value={resForm.firstName}
                onChange={(e: any) => {
                  this.handleChange(e, index);
                }}
                type='text'
                name='firstName'
                id='firstName'
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for='lastName'>Last Name</Label>
              <Input
                value={resForm.lastName}
                onChange={(e: any) => {
                  this.handleChange(e, index);
                }}
                type='text'
                name='lastName'
                id='lastName'
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for='currAddress'>Address</Label>
          <Input
            value={resForm.currAddress}
            onChange={(e: any) => {
              this.handleChange(e, index);
            }}
            type='text'
            name='currAddress'
            id='currAddress'
          />
        </FormGroup>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for='currCity'>City</Label>
              <Input
                value={resForm.currCity}
                onChange={(e: any) => {
                  this.handleChange(e, index);
                }}
                type='text'
                name='currCity'
                id='currCity'
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for='currState'>State</Label>
              <Input
                value={resForm.currState}
                onChange={(e: any) => {
                  this.handleChange(e, index);
                }}
                type='text'
                name='currState'
                id='currState'
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label for='currZip'>Zip</Label>
              <Input
                value={resForm.currZip}
                onChange={(e: any) => {
                  this.handleChange(e, index);
                }}
                type='text'
                name='currZip'
                id='currZip'
                maxlength='5'
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for='phoneNumber'>Phone Number</Label>
          <Input
            value={resForm.phoneNumber}
            onChange={(e: any) => {
              this.handleChange(e, index);
            }}
            type='tel'
            name='phoneNumber'
            id='phoneNumber'
            placeholder='Ex: (999) 999-9999'
            maxlength='14'
          />
        </FormGroup>
        <Row form>
          <Col className='center-div offset-11' md={1}>
            <Button color='danger' onClick={(e) => this.removeRow(index)}>
              Remove
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  newProspect = async (e: any) => {
    e.preventDefault();
    if (!this.state.expMoveIn && this.state.resArr.length < 1) {
      return this.setState({
        alertVis: true,
        alertMessage:
          'Cannot create household with no expected move in and no prospects.',
      });
    } else if (!this.state.expMoveIn) {
      return this.setState({
        alertVis: true,
        alertMessage:
          'You must enter an expected move in date for this household.',
      });
    } else if (this.state.resArr.length < 1) {
      return this.setState({
        alertVis: true,
        alertMessage:
          'You must have at least 1 prospect in order to create this household.',
      });
    } else if (this.state.resArr.length > 5) {
      return this.setState({
        alertVis: true,
        alertMessage: 'No more than 5 people can reside in an apartment.',
      });
    } else {
      let resArr = this.state.resArr;
      let hh = await newHousehold(this.state.expMoveIn);
      for (let i = 0; i < resArr.length; i++) {
        let r = resArr[i];
        await newResident(
          hh.householdId,
          r.firstName,
          r.lastName,
          r.phoneNumber,
          r.currAddress,
          r.currCity,
          r.currState,
          r.currZip
        );
      }
      this.props.history.push({
        pathname: '/prospects',
        state: {
          message: `Your new houshold was created!`,
        },
      });
    }
  };

  render() {
    console.log('resArr: ', this.state.resArr);
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>Create Prospect</h2>
          </Col>
        </Row>
        <Form onSubmit={this.newProspect}>
          {this.state.resArr.map((row: any, index: number) => {
            return this.resInput(row, index);
          })}
          <Row>
            <Col className='center-div' md={12}>
              <Button onClick={this.addRow} color='success'>
                + Prospect
              </Button>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Label xs={2} for='exampleDate'>
                  Desired Move Date:
                </Label>
                <Input
                  onChange={this.handleDate}
                  value={this.state.expMoveIn}
                  type='date'
                  name='date'
                  id='exampleDate'
                  placeholder='date placeholder'
                />
              </FormGroup>
            </Col>
          </Row>{' '}
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
          <Button color='success'>Create</Button>
        </Form>
      </Container>
    );
  }
}
