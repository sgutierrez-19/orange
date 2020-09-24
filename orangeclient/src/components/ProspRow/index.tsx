import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class ProspRow extends React.Component<any, any> {
  render() {
    let r = this.props.resident;
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          <Link to={`/res-details/redirect/${r.residentId}`}>
            {r.lastName}, {r.firstName}
          </Link>
        </td>

        <td style={{ textAlign: 'center' }}>
          {moment(r.householdId.expectedMoveIn, [
            'YYYY-MM-DD',
            'MMM-DD-YYYY',
          ]).format('MMM D, YYYY')}
        </td>
      </tr>
    );
  }
}
