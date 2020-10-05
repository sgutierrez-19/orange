import React from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
  Table,
} from 'reactstrap';
import { getApartmentLike } from '../../../api/apartments';
import { getResByName } from '../../../api/residents';
import { NotesAptRow } from '../../NotesAptRow';
import { NotesResRow } from '../../NotesResRow';

import './style.css';

export default class FindNotes extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchInput: '',
      searchBy: 'byName',
      aptArr: [],
      resArr: [],
      alertVis: false,
      alertMessage: '',
      test: '',
    };
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  async componentDidMount() {}

  findResident = async (e: any) => {
    e.preventDefault();
    if (this.state.search === '') {
      this.setState({
        alertMessage: `You need to enter a name to search.`,
        alertVis: true,
      });
    } else {
      let names = await getResByName(this.state.search);
      if (names.length < 1) {
        this.setState({
          alertMessage: `Could not find any residents with '${this.state.search}'`,
          alertVis: true,
          search: '',
        });
      } else {
        this.setState({
          aptArr: [],
          resArr: names,
          search: '',
        });
        console.log(names);
      }
    }
  };

  findApartment = async (e: any) => {
    e.preventDefault();
    if (this.state.search === '') {
      this.setState({
        alertMessage: `You need to enter a valid apartment number to search for.`,
        alertVis: true,
      });
    } else {
      let apts = await getApartmentLike(this.state.search);
      if (apts.length < 1) {
        this.setState({
          aptArr: [],
          resArr: [],
          alertMessage: `Could not find apartment #${this.state.search}`,
          search: '',
          alertVis: true,
        });
      } else {
        console.log(apts);
        let occApts = [];
        for (let i = 0; i < apts.length; i++) {
          if (apts[i].occupiedBy !== null || apts[i].reservedBy !== null) {
            occApts.push(apts[i]);
          }
        }
        if (occApts.length < 1) {
          this.setState({
            resArr: [],
            aptArr: [],
            alertMessage: `Apt #${this.state.search} is currently vacant and unreserved.`,
            search: '',
            alertVis: true,
          });
        } else {
          this.setState({
            resArr: [],
            aptArr: occApts,
            search: '',
          });
        }
      }
    }
  };

  handle = (e: any) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };

  selectApt = (e: any, aptNum: String) => {
    e.preventDefault();
    let aptResArr = [];
    let selApt = this.state.aptArr.find((a: any) => {
      return a.apartmentNumber === aptNum;
    });

    if (selApt.occupiedBy && selApt.occupiedBy) {
      let occRes = selApt.occupiedBy.residents;
      for (let i = 0; i < occRes.length; i++) {
        aptResArr.push(occRes[i]);
      }
    }
    if (selApt.reservedBy && selApt.reservedBy) {
      let resRes = selApt.reservedBy.residents;
      for (let i = 0; i < resRes.length; i++) {
        aptResArr.push(resRes[i]);
      }
    }
    this.setState({
      resArr: aptResArr,
      aptArr: [],
      searchBy: 'byName',
    });
  };

  render() {
    return (
      <Container>
        <Row className='title-row'>
          <Col className='center-div offset-3' xs={6}>
            <h2>Household Notes</h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div search-bar offset-2' xs={8}>
            <FormGroup tag='fieldset'>
              <FormGroup check inline>
                <Label className='search-radios' check>
                  <Input
                    defaultChecked
                    type='radio'
                    name='searchBy'
                    value='byName'
                    onChange={(e: any) => this.handle(e)}
                  />{' '}
                  Search by Name
                </Label>
                <Label className='search-radios' check>
                  <Input
                    type='radio'
                    name='searchBy'
                    value='byApt'
                    onChange={(e: any) => this.handle(e)}
                  />{' '}
                  Search by Apartment
                </Label>
              </FormGroup>
            </FormGroup>
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
        <Row>
          <Col className='center-div search-bar offset-3' xs={6}>
            {this.state.searchBy === 'byName' ? (
              <form onSubmit={this.findResident}>
                <InputGroup>
                  <Input
                    type='text'
                    value={this.state.search || ''}
                    name='search'
                    onChange={(e: any) => this.handle(e)}
                    placeholder='Resident Name'
                  />
                  <InputGroupAddon addonType='append'>
                    <Button>Find Resident</Button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            ) : (
              <form onSubmit={this.findApartment}>
                <InputGroup>
                  <Input
                    type='text'
                    value={this.state.search || ''}
                    name='search'
                    onChange={(e: any) => this.handle(e)}
                    placeholder='Apartment Number'
                  />
                  <InputGroupAddon addonType='append'>
                    <Button>Find Apartment</Button>
                  </InputGroupAddon>
                </InputGroup>
              </form>
            )}
          </Col>
        </Row>
        {this.state.aptArr.length > 0 ? (
          <Row>
            <Col className='center-div' xs={12}>
              <Table hover bordered striped>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Apt #</th>
                    <th style={{ textAlign: 'center' }}>Occupied</th>
                    <th style={{ textAlign: 'center' }}>Reserved</th>
                    <th style={{ textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.aptArr.map((a: any) => {
                    return (
                      <NotesAptRow
                        key={a.apartmentNumber}
                        apartment={a}
                        selApt={this.selectApt}
                      />
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        ) : (
          [
            this.state.resArr.length > 0 ? (
              <>
                <Row>
                  <Col className='center-div' xs={12}>
                    <Table hover bordered striped>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'center' }}>Resident</th>
                          <th style={{ textAlign: 'center' }}>Status</th>
                          <th style={{ textAlign: 'center' }}>Apt #</th>
                          <th style={{ textAlign: 'center' }}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.resArr.map((r: any) => {
                          return (
                            <NotesResRow key={r.residentId} resident={r} />
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </>
            ) : (
              <></>
            ),
          ]
        )}
        {/* {this.props.location.state && this.props.location.state.resident
          ? 'Redirected LOL'
          : 'DIRECT FLIGHT NON STOP'} */}
      </Container>
    );
  }
}
