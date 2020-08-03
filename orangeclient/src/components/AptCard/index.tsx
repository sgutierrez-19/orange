import React from 'react';

import './style.css';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AptCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      linkTo: '/details/',
    };
  }

  render() {
    return (
      <div className='apt-card'>
        <Row>
          <Col className='center-div' xs={12}>
            <Link
              to={
                this.state.linkTo + this.props.apt.apartmentNumber.toLowerCase()
              }
            >
              <img
                className='apt-card-img'
                src='https://www.flaticon.com/premium-icon/icons/svg/1669/1669669.svg'
                alt='apartment icon'
              />
            </Link>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className='center-div' xs={12}>
            <h5>Apt #{this.props.apt.apartmentNumber}</h5>
          </Col>
        </Row>
      </div>
    );
  }
}
