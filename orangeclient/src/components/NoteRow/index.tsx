import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export class NoteRow extends React.Component<any, any> {
  render() {
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          {moment(this.props.note.dateCreated, [
            'YYYY-MM-DD',
            'MMM-DD-YYYY',
          ]).format('MMM D, YYYY')}
        </td>

        <td style={{ textAlign: 'center' }}>{this.props.note.note}</td>
      </tr>
    );
  }
}
