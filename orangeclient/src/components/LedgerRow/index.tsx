import React from 'react';
import moment from 'moment';

export class LedgerRow extends React.Component<any, any> {
  render() {
    let r = this.props.row;
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          {moment(r.dateCreated, ['YYYY-MM-DD', 'MMM-DD-YYYY']).format(
            'MMM D, YYYY'
          )}
        </td>

        <td style={{ textAlign: 'center' }}>{r.description}</td>

        <td style={{ textAlign: 'center' }}>{r.categoryId.name}</td>

        <td style={{ textAlign: 'center' }}>{r.amount}</td>
      </tr>
    );
  }
}
