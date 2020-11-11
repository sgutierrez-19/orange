import React from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from 'reactstrap';
import moment from 'moment';
import { getCategories } from '../../../api/categories';
import { getResLedgerRows } from '../../../api/ledger';
import { createRow } from '../../../api/ledgerrows';
import { LedgerRow } from '../../LedgerRow';

export class Ledger extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      resident: this.props.location.state.resident,
      household: this.props.location.state.household,
      roommates: this.props.location.state.roommates,
      ledger: {},
      ledgerRows: [],
      categories: [],
      modalP: false,
      modalC: false,
      amount: '',
      category: '',
      description: '',
      alertVis: false,
      alertMessage: '',
    };
  }

  async componentDidMount() {
    let ledgerRows = await getResLedgerRows(this.state.household.householdId);
    let categories = await getCategories();
    console.log('ledgerRows: ', ledgerRows);

    console.log('categories: ', categories);
    if (ledgerRows.length < 1) {
      this.setState({
        ledgerRows: [],
        categories: categories,
      });
    } else {
      this.setState({
        ledgerRows: ledgerRows.reverse(),
        ledger: ledgerRows[0].ledgerId,
        categories: categories,
      });
    }
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  togglePayment = () => {
    let pmtId: any = [];
    this.state.categories.map((c: any) => {
      if (c.name === 'PMT') {
        pmtId.push(c.categoryId);
      }
    });
    this.setState({ modalP: !this.state.modalP, category: pmtId[0] });
  };
  toggleCharge = () =>
    this.setState({
      modalC: !this.state.modalC,
      category: this.state.categories[0].categoryId,
    });

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  createPayment = async (e: any) => {
    e.preventDefault();
    let amount = '-' + this.state.amount;
    let category = this.state.category;
    let description = this.state.description;
    if (isNaN(parseFloat(this.state.amount))) {
      this.setState({
        alertVis: true,
        alertMessage: 'Amount must be a two digit number.',
      });
    } else {
      let row = await createRow(
        this.state.household.householdId,
        moment().format('YYYY-MM-DD'),
        category,
        description,
        amount
      );
      let ledgerRows = await getResLedgerRows(this.state.household.householdId);
      console.log(row);
      this.setState({
        amount: '',
        description: '',
        category: '',
        ledgerRows: ledgerRows.reverse(),
        ledger: ledgerRows[0].ledgerId,
        modalP: false,
      });
    }
  };

  createCharge = async (e: any) => {
    e.preventDefault();
    let amount = this.state.amount;
    let category = this.state.category;
    let description = this.state.description;
    if (isNaN(parseFloat(this.state.amount))) {
      this.setState({
        alertVis: true,
        alertMessage: 'Amount must be a two digit number.',
      });
    } else {
      let row = await createRow(
        this.state.household.householdId,
        moment().format('YYYY-MM-DD'),
        category,
        description,
        amount
      );
      let ledgerRows = await getResLedgerRows(this.state.household.householdId);
      console.log(row);
      this.setState({
        amount: '',
        description: '',
        category: '',
        ledgerRows: ledgerRows.reverse(),
        ledger: ledgerRows[0].ledgerId,
        modalC: false,
      });
    }
  };

  render() {
    let h = this.state.household;
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>
              Ledger For {this.state.resident.firstName}{' '}
              {this.state.resident.lastName}
            </h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div search-bar offset-3' xs={3}>
            <Button onClick={this.toggleCharge} color='danger'>
              Add Charge
            </Button>
          </Col>
          <Col className='center-div search-bar' xs={3}>
            <Button onClick={this.togglePayment} color='success'>
              Add Payment
            </Button>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modalP}
          toggle={this.togglePayment}
          className='nothing'
        >
          <ModalHeader toggle={this.togglePayment}>Add Payment</ModalHeader>
          <Form onSubmit={this.createPayment}>
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
            <ModalBody>
              <FormGroup row>
                <Col className='center-div offset-3' xs={2}>
                  <Label for='amount'>Amount</Label>
                </Col>
                <Col className='center-div' xs={1}>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                </Col>
                <Col className='center-div' xs={3}>
                  <Input
                    value={this.state.amount}
                    required
                    type='text'
                    name='amount'
                    id='amount'
                    placeholder='0.00'
                    onChange={(e: any) => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className='center-div offset-3' xs={2}>
                  <Label for='exampleSelect'>Code</Label>
                </Col>
                <Col className='center-div' xs={4}>
                  <Input
                    required
                    defaultValue='12'
                    value={this.state.category}
                    type='select'
                    name='category'
                    id='exampleSelect'
                    onChange={(e: any) => this.handleChange(e)}
                  >
                    {this.state.categories.map((c: any) => {
                      if (c.name === 'PMT' || c.name === 'CONCESSION') {
                        return (
                          <option key={c.categoryId} value={c.categoryId}>
                            {c.name}
                          </option>
                        );
                      }
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className='center-div' xs={12}>
                  <Label for='exampleText'>Description</Label>
                  <Input
                    value={this.state.description}
                    required
                    type='textarea'
                    name='description'
                    id='exampleText'
                    onChange={(e: any) => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='success'>Create Payment</Button>{' '}
              <Button color='secondary' onClick={this.togglePayment}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        <Modal
          isOpen={this.state.modalC}
          toggle={this.toggleCharge}
          className='nothing'
        >
          <ModalHeader toggle={this.toggleCharge}>Add Charge</ModalHeader>
          <Form onSubmit={this.createCharge}>
            <ModalBody>
              <FormGroup row>
                <Col className='center-div offset-3' xs={2}>
                  <Label for='amount'>Amount</Label>
                </Col>
                <Col className='center-div' xs={1}>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                </Col>
                <Col className='center-div' xs={3}>
                  <Input
                    value={this.state.amount}
                    required
                    type='text'
                    name='amount'
                    id='amount'
                    placeholder='0.00'
                    onChange={(e: any) => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className='center-div offset-3' xs={2}>
                  <Label for='exampleSelect'>Code</Label>
                </Col>

                <Col className='center-div' xs={4}>
                  <Input
                    required
                    value={this.state.cateogry}
                    type='select'
                    name='category'
                    id='exampleSelect'
                    onChange={(e: any) => this.handleChange(e)}
                  >
                    {this.state.categories.map((c: any) => {
                      if (c.name !== 'PMT' && c.name !== 'CONCESSION') {
                        return (
                          <option key={c.categoryId} value={c.categoryId}>
                            {c.name}
                          </option>
                        );
                      }
                    })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className='center-div' xs={12}>
                  <Label for='exampleText'>Description</Label>
                  <Input
                    required
                    value={this.state.description}
                    type='textarea'
                    name='description'
                    id='exampleText'
                    onChange={(e: any) => this.handleChange(e)}
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='danger'>Create Charge</Button>{' '}
              <Button color='secondary' onClick={this.toggleCharge}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Row>
          <Col className='center-div offset-2' xs={8}>
            <Table hover bordered striped>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Apt#</th>
                  <th style={{ textAlign: 'center' }}>Move In</th>
                  <th style={{ textAlign: 'center' }}>Move Out</th>
                  <th style={{ textAlign: 'center' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: 'center' }}>
                    {h.occupying
                      ? h.occupying.apartmentNumber
                      : [
                          h.reserving
                            ? h.reserving.apartmentNumber
                            : [h.prevApt ? h.prevApt : '--'],
                        ]}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    {h.moveIn
                      ? moment(h.moveIn, ['YYYY-MM-DD', 'MMM-DD-YYYY']).format(
                          'MMM D, YYYY'
                        )
                      : '--'}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    {h.moveOut
                      ? moment(h.moveOut, ['YYYY-MM-DD', 'MMM-DD-YYYY']).format(
                          'MMM D, YYYY'
                        )
                      : '--'}
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    {this.state.ledger.balance}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-2' xs={8}>
            <Table>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Date</th>
                  <th style={{ textAlign: 'center' }}>Description</th>
                  <th style={{ textAlign: 'center' }}>Code</th>
                  <th style={{ textAlign: 'center' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ledgerRows ? (
                  this.state.ledgerRows.map((r: any) => {
                    return <LedgerRow key={r.rowId} row={r} />;
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
