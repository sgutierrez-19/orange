import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export class Residents extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container className='main-container'>
        <Row className='title-row'>
          <Col className='center-div' xs={12}>
            <h2>Residents Dashboard</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Residents;
