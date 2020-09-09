import React from 'react';
import { Link } from 'react-router-dom';

export class AptRow extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          <Link to={`/details/redirect/${this.props.apartment.apartmentId}`}>
            {this.props.apartment.apartmentNumber}
          </Link>
        </td>

        {this.props.apartment.isRentable ? (
          <td style={{ textAlign: 'center' }}>Yes</td>
        ) : (
          <td style={{ textAlign: 'center' }}>No</td>
        )}

        {this.props.apartment.occupiedBy ? (
          <td style={{ textAlign: 'center' }}>X</td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}
        {this.props.apartment.occupiedBy ? (
          <td style={{ textAlign: 'center' }}>
            {this.props.apartment.occupiedBy.moveIn}
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}

        {this.props.apartment.occupiedBy &&
        this.props.apartment.occupiedBy.onNotice ? (
          <td style={{ textAlign: 'center' }}>X</td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}
        {this.props.apartment.occupiedBy &&
        this.props.apartment.occupiedBy.onNotice ? (
          <td style={{ textAlign: 'center' }}>
            {this.props.apartment.occupiedBy.expectedMoveOut}
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}

        {this.props.apartment.reservedBy ? (
          <td style={{ textAlign: 'center' }}>X</td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}
        {this.props.apartment.reservedBy ? (
          <td style={{ textAlign: 'center' }}>
            {this.props.apartment.reservedBy.expectedMoveIn}
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}
      </tr>
    );
  }
}
