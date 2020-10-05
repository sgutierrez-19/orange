import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

export class NotesResRow extends React.Component<any, any> {
  render() {
    let r = this.props.resident;
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          <Link to={`/res-details/redirect/${r.residentId}`}>
            {r.firstName} {r.lastName}
          </Link>
        </td>
        <td style={{ textAlign: 'center' }}>
          {r.householdId.isCurrent
            ? 'Current'
            : [
                r.householdId.isFuture
                  ? 'Future'
                  : [
                      r.householdId.isPast
                        ? 'Past'
                        : [r.householdId.isProspect ? 'Prospect' : ''],
                    ],
              ]}
        </td>
        <td style={{ textAlign: 'center' }}>
          {r.householdId.occupying
            ? r.householdId.occupying.apartmentNumber
            : [
                r.householdId.reserving
                  ? r.householdId.reserving.apartmentNumber
                  : '--',
              ]}
        </td>
        <td style={{ textAlign: 'center' }}>
          <NavLink to={`/create-note/${r.householdId.householdId}`}>
            <Button color='success'>Select</Button>
          </NavLink>
        </td>
      </tr>
    );
  }
}
