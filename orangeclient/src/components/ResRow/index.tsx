import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class ResRow extends React.Component<any, any> {
  render() {
    let r = this.props.resident;
    console.log('PAST', this.props.resident);
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          <Link to={`/res-details/redirect/${r.residentId}`}>
            {r.lastName}, {r.firstName}
          </Link>
        </td>

        {r.householdId.isCurrent ? (
          <td style={{ textAlign: 'center' }}>
            {r.householdId.occupying.apartmentNumber}
          </td>
        ) : r.householdId.isFuture ? (
          <td style={{ textAlign: 'center' }}>
            {r.householdId.reserving.apartmentNumber}
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>{r.householdId.prevApt}</td>
        )}

        {r.householdId.isCurrent ? (
          <td style={{ textAlign: 'center' }}>
            {moment(r.householdId.moveIn, ['YYYY-MM-DD', 'MMM-DD-YYYY']).format(
              'MMM D, YYYY'
            )}
          </td>
        ) : r.householdId.isFuture ? (
          <td style={{ textAlign: 'center' }}>
            {moment(r.householdId.expectedMoveIn, [
              'YYYY-MM-DD',
              'MMM-DD-YYYY',
            ]).format('MMM D, YYYY')}
          </td>
        ) : (
          <td style={{ textAlign: 'center' }}>
            {moment(r.householdId.moveOut, [
              'YYYY-MM-DD',
              'MMM-DD-YYYY',
            ]).format('MMM D, YYYY')}
          </td>
        )}

        {r.householdId.onNotice && r.householdId.expectedMoveOut ? (
          <td style={{ textAlign: 'center' }}>
            {moment(r.householdId.expectedMoveOut, [
              'YYYY-MM-DD',
              'MMM-DD-YYYY',
            ]).format('MMM D, YYYY')}
          </td>
        ) : r.householdId.isCurrent ? (
          <td style={{ textAlign: 'center' }}>--</td>
        ) : (
          <></>
        )}
      </tr>
    );
  }
}
