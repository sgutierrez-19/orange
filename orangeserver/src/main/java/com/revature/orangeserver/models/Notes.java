package com.revature.orangeserver.models;

import java.sql.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "something", name = "notes")
public class Notes {

  @Id
  @Column(name = "note_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer noteId;
  
  @ManyToOne
  @JsonIgnoreProperties({"notes, household"})
  @JoinColumn(name = "household_id")
  private Households householdId;
  
  @Column(name = "date_created")
  private Date dateCreated;
  
  @Column(name = "note")
  private String note;

  public Notes() {
    super();
  }

  public Notes(Integer noteId, Households householdId, Date dateCreated, String note) {
    super();
    this.noteId = noteId;
    this.householdId = householdId;
    this.dateCreated = dateCreated;
    this.note = note;
  }

  public Integer getNoteId() {
    return noteId;
  }

  public void setNoteId(Integer noteId) {
    this.noteId = noteId;
  }

  public Households getHouseholdId() {
    return householdId;
  }

  public void setHouseholdId(Households householdId) {
    this.householdId = householdId;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  @Override
  public String toString() {
    return "Notes [noteId=" + noteId + ", householdId=" + householdId + ", dateCreated="
        + dateCreated + ", note=" + note + "]";
  }

  
}
