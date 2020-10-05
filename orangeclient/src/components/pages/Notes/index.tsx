import React from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import { getHousehold } from '../../../api/households';
import { getNotes, createNote } from '../../../api/notes';
import { NoteRow } from '../../NoteRow';
import moment from 'moment';

import './style.css';

export default class Notes extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      notes: [],
      note: '',
      household: null,
      alertVis: false,
      alertMessage: '',
    };
  }

  async componentDidMount() {
    let hh = await getHousehold(this.props.hh);
    console.log('HH: ', hh);
    if (!hh) {
      this.setState({
        alertVis: true,
        alertMessage: 'Could not find a matching household.  Please try again.',
      });
    } else {
      let notes = await getNotes(hh.householdId);
      notes = notes.sort((a: any, b: any) => {
        return b.noteId - a.noteId;
      });
      this.setState({
        household: hh,
        notes: notes,
      });
    }
  }

  toggle = (e: any) => {
    this.setState({
      alertVis: false,
    });
  };

  handleChange = (e: any) => {
    this.setState({
      note: e.target.value,
    });
  };

  createNote = async (e: any) => {
    e.preventDefault();
    if (this.state.note === '') {
      this.setState({
        alertVis: true,
        alertMessage: 'Cannot create an empty note.',
      });
    } else {
      let note = await createNote(
        this.state.household.householdId,
        moment().format('YYYY-MM-DD'),
        this.state.note
      );
      let noteArr = this.state.notes;
      noteArr.unshift(note);
      this.setState({
        note: '',
        notes: noteArr,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row className='title-row'>
          <Col className='center-div offset-3' xs={6}>
            <h2>Notes</h2>
          </Col>
        </Row>{' '}
        <Row className='info-row'>
          <Col className='center-div' xs={6}>
            <h4>
              -
              {this.state.household && this.state.household.occupying
                ? `Occupying Apartment #${this.state.household.occupying.apartmentNumber}`
                : [
                    this.state.household && this.state.household.reserving
                      ? `Reserving Apartment #${this.state.household.reserving.apartmentNumber}`
                      : 'Prospects',
                  ]}
              -
            </h4>
          </Col>
          <Col className='center-div' xs={6}>
            <p>Household:</p>
            <ul>
              {this.state.household && this.state.household.residents ? (
                this.state.household.residents.map((r: any) => {
                  return (
                    <li key={r.residentId}>
                      {r.firstName} {r.lastName}
                    </li>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='center-div offset-3' xs={6}>
            <Alert
              color='danger'
              toggle={this.toggle}
              isOpen={this.state.alertVis}
            >
              {this.state.alertMessage}
            </Alert>
          </Col>
        </Row>
        <Form onSubmit={this.createNote}>
          <FormGroup row>
            <Label xs={6} className='offset-3' for='exampleText'>
              New Note:
            </Label>
            <Col className='center-div offset-3' xs={6}>
              <Input
                value={this.state.note}
                onChange={this.handleChange}
                type='textarea'
                name='text'
                id='exampleText'
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col className=' center-div offset-5' xs={2}>
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
        <Row>
          <Col className='center-div' xs={12}>
            {this.state.notes.length > 0 ? (
              <Table hover bordered striped>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Date</th>
                    <th style={{ textAlign: 'center' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.notes.map((n: any) => {
                    return <NoteRow key={n.noteId} note={n} />;
                  })}
                </tbody>
              </Table>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
