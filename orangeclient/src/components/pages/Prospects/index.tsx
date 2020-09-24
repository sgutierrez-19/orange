import React from 'react';
import { Container, Row, Col, Table } from 'reactstrap';

import './style.css';
import { ProspRow } from '../../ProspRow';
import { getprospectiveRes } from '../../../api/residents';

export class Prospects extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      residentList: null,
    };
  }

  async componentDidMount() {
    let prospective = await getprospectiveRes();
    this.setState({
      residentList: prospective.sort(this.compareLastName),
    });
  }

  compareLastName = (a: any, b: any) => {
    if (a.householdId.householdId < b.householdId.householdId) {
      return -1;
    } else if (a.householdId.householdId > b.householdId.householdId) {
      return 1;
    } else {
      return 0;
    }
  };

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>Prospect Dashboard</h2>
          </Col>
        </Row>
        <Row>
          <Col className='center-div' xs={12}>
            <Table hover bordered striped>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Name</th>
                  <th style={{ textAlign: 'center' }}>Desired Move In</th>
                </tr>
              </thead>
              <tbody>
                {this.state.residentList ? (
                  this.state.residentList.map((r: any) => {
                    return <ProspRow key={r.residentId} resident={r} />;
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

export default Prospects;
