import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button } from 'reactstrap';

export class NotesAptRow extends React.Component<any, any> {
  getHhArr = () => {
    let hhArr = [];
    if (this.props.apartment.occupiedBy) {
      hhArr.push(this.props.apartment.occupiedBy);
    }
    if (this.props.apartment.reservedBy) {
      hhArr.push(this.props.apartment.reservedBy);
    }
    return hhArr;
  };
  render() {
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>
          {this.props.apartment.apartmentNumber}
        </td>

        {this.props.apartment.occupiedBy ? (
          <td style={{ textAlign: 'center' }}>X</td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}

        {this.props.apartment.reservedBy ? (
          <td style={{ textAlign: 'center' }}>X</td>
        ) : (
          <td style={{ textAlign: 'center' }}>--</td>
        )}

        <td style={{ textAlign: 'center' }}>
          <Button
            color='success'
            onClick={(e: any) =>
              this.props.selApt(e, this.props.apartment.apartmentNumber)
            }
          >
            Select
          </Button>
        </td>
      </tr>
    );
  }
}
