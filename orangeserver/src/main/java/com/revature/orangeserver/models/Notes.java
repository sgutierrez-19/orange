package com.revature.orangeserver.models;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(schema = "something", name = "notes")
public class Notes {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
  @ManyToOne
  @JoinColumn(name = "household_id")
  private Households householdId;
  
  @Column(name = "date_created")
  private Date dateCreated;
  
  @Column(name = "note")
  private String note;

  public Notes() {
    super();
  }

  public Notes(Integer id, Households householdId, Date dateCreated, String note) {
    super();
    this.id = id;
    this.householdId = householdId;
    this.dateCreated = dateCreated;
    this.note = note;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  
}
