import React from 'react';
import { Container, Row, Col, Table, Button, Alert } from 'reactstrap';

import './style.css';
import { ProspRow } from '../../ProspRow';
import { getprospectiveRes } from '../../../api/residents';

export class Prospects extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      residentList: null,
      redirectAlert: false,
      redirectAlertMessage: '',
    };
  }

  toggle = (e: any) => {
    this.setState({
      redirectAlert: false,
    });
  };

  async componentDidMount() {
    if (!this.props.location.state) {
      let prospective = await getprospectiveRes();
      this.setState({
        residentList: prospective.sort(this.compareLastName),
      });
    } else {
      let prospective = await getprospectiveRes();
      console.log(prospective);
      this.setState({
        residentList: prospective.sort(this.compareLastName),
        redirectAlert: true,
        redirectAlertMessage: this.props.location.state.message,
      });
    }
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

  goToNew = (e: any) => {
    this.props.history.push('/new-prospect');
  };

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div offset-3' xs={6}>
            <h2>Prospect Dashboard</h2>
          </Col>
          <Col className='center-div' xs={3}>
            <Button color='success' onClick={this.goToNew}>
              + New Prospect
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-2' xs={8}>
            <Alert
              color='success'
              toggle={this.toggle}
              isOpen={this.state.redirectAlert}
            >
              {this.state.redirectAlertMessage}
            </Alert>
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
