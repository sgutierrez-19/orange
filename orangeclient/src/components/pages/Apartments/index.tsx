import React from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  Alert,
} from 'reactstrap';
import {
  getAllApartments,
  getApartmentByAptNum,
} from '../../../api/apartments';
import { AptRow } from '../../AptRow';

import './style.css';

export class Apartments extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      apartments: null,
      apartment: null,
      search: '',
      showAll: true,
      alertVis: false,
      alertNum: '',
    };
  }

  async componentDidMount() {
    let all = await getAllApartments();
    this.setState({
      apartments: all,
    });
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  setSearch = (e: any) => {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
  };

  findApt = async (e: any) => {
    e.preventDefault();
    let apt = await getApartmentByAptNum(this.state.search);
    if (this.state.search === null || this.state.search === '') {
      this.setState({
        showAll: true,
        search: '',
        alertVis: false,
      });
    } else if (!apt) {
      this.setState({
        showAll: true,
        alertNum: this.state.search,
        search: '',
        alertVis: true,
      });
    } else {
      this.setState({
        apartment: apt,
        showAll: false,
        search: '',
        alertVis: false,
      });
    }
  };

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>Apartments Dashboard</h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div search-bar offset-4' xs={4}>
            <form onSubmit={this.findApt}>
              <InputGroup>
                <Input
                  type='text'
                  value={this.state.search}
                  onChange={this.setSearch}
                  placeholder='Apartment Number'
                />
                <InputGroupAddon addonType='append'>
                  <Button>Find Apartment</Button>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-3' xs={6}>
            <Alert
              color='danger'
              toggle={this.toggle}
              isOpen={this.state.alertVis}
            >
              Could not find apartment #{this.state.alertNum}
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col className='center-div' xs={12}>
            <Table hover bordered striped>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Apt #</th>
                  <th style={{ textAlign: 'center' }}>Available to Rent</th>
                  <th style={{ textAlign: 'center' }}>Occupied</th>
                  <th style={{ textAlign: 'center' }}>Moved In</th>
                  <th style={{ textAlign: 'center' }}>On Notice</th>
                  <th style={{ textAlign: 'center' }}>Expected Move Out</th>
                  <th style={{ textAlign: 'center' }}>Reserved</th>
                  <th style={{ textAlign: 'center' }}>Expected Move In</th>
                </tr>
              </thead>
              <tbody>
                {this.state.showAll ? (
                  [
                    this.state.apartments &&
                      this.state.apartments.map((a: any) => {
                        return <AptRow key={a.apartmentNumber} apartment={a} />;
                      }),
                  ]
                ) : (
                  <>
                    <AptRow apartment={this.state.apartment} />
                  </>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Apartments;
