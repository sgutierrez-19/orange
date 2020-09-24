import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class AptRow extends React.Component<any, any> {
  render() {
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          <Link
            to={`/details/redirect/${this.props.apartment.apartmentNumber}`}
          >
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
            {moment(this.props.apartment.occupiedBy.moveIn, [
              'YYYY-MM-DD',
              'MMM-DD-YYYY',
            ]).format('MMM D, YYYY')}
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
            {moment(this.props.apartment.occupiedBy.expectedMoveOut, [
              'YYYY-MM-DD',
              'MMM-DD-YYYY',
            ]).format('MMM D, YYYY')}
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
            {moment(this.props.apartment.reservedBy.expectedMoveIn, [
              'YYYY-MM-DD',
              'MMM-DD-YYYY',
            ]).format('MMM D, YYYY')}
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}
      </tr>
    );
  }
}
