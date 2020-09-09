import React from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Button,
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
      search: null,
      showAll: true,
    };
  }

  async componentDidMount() {
    let all = await getAllApartments();
    console.log(all);
    this.setState({
      apartments: all,
    });
  }

  setSearch = (e: any) => {
    e.preventDefault();
    this.setState({
      search: e.target.value,
    });
    console.log(this.state.search);
  };

  findApt = async (e: any) => {
    e.preventDefault();
    console.log('harro? lol');
    let apt = await getApartmentByAptNum(this.state.search);
    console.log('APT: ', apt);
    if (this.state.search == null || this.state.search == '') {
      this.setState({
        showAll: true,
        search: '',
      });
    } else if (!apt) {
      alert(`Could not find apartment #${this.state.search}`);
      this.setState({
        showAll: true,
        search: '',
      });
    } else {
      this.setState({
        apartment: apt,
        showAll: false,
        search: '',
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
                        return <AptRow apartment={a} />;
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
