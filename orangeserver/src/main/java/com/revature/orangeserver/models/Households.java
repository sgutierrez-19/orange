package com.revature.orangeserver.models;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "something", name = "households")
public class Households {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "apartment_number", referencedColumnName = "id") 
  private Apartments apartmentNumber;
  
  @Column(name = "expected_move_in")
  private Date expectedMoveIn;
  
  @Column(name = "expected_move_out")
  private Date expectedMoveOut;
  
  @Column(name = "move_in")
  private Date moveIn;
  
  @Column(name = "move_out")
  private Date moveOut;
  
  @Column(name = "is_prospect")
  private Boolean isProspect;
  
  @Column(name = "is_future")
  private Boolean isFuture;
  
  @Column(name = "is_current")
  private Boolean isCurrent;
  
  @Column(name = "on_notice")
  private Boolean onNotice;
  
  @Column(name = "is_past")
  private Boolean isPast;
  
  @JsonIgnoreProperties({"households"})
  @OneToMany(mappedBy = "householdId", cascade = CascadeType.MERGE)
  private List<Notes> notes;
  
  @JsonIgnoreProperties({"households"})
  @OneToMany(mappedBy = "householdId", cascade = CascadeType.MERGE)
  private List<Residents> residents;
  
//  @JsonIgnoreProperties({"households"})
//  @OneToMany(mappedBy = "reservedBy", cascade = CascadeType.MERGE)
//  private Apartments resApt;

  @JsonIgnoreProperties({"households"})
  @OneToOne(mappedBy = "occupiedBy", cascade = CascadeType.MERGE)
  private Apartments occApt;

  public Households() {
    super();
    // TODO Auto-generated constructor stub
  }

  public Households(Integer id, Integer apartmentNumber, Date expectedMoveIn, Date expectedMoveOut,
      Date moveIn, Date moveOut, Boolean isProspect, Boolean isFuture, Boolean isCurrent,
      Boolean onNotice, Boolean isPast, List<Notes> notes, List<Residents> residents,
      Apartments occApt) {
    super();
    this.id = id;
    this.apartmentNumber = apartmentNumber;
    this.expectedMoveIn = expectedMoveIn;
    this.expectedMoveOut = expectedMoveOut;
    this.moveIn = moveIn;
    this.moveOut = moveOut;
    this.isProspect = isProspect;
    this.isFuture = isFuture;
    this.isCurrent = isCurrent;
    this.onNotice = onNotice;
    this.isPast = isPast;
    this.notes = notes;
    this.residents = residents;
    this.occApt = occApt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public Integer getApartmentNumber() {
    return apartmentNumber;
  }

  public void setApartmentNumber(Integer apartmentNumber) {
    this.apartmentNumber = apartmentNumber;
  }

  public Date getExpectedMoveIn() {
    return expectedMoveIn;
  }

  public void setExpectedMoveIn(Date expectedMoveIn) {
    this.expectedMoveIn = expectedMoveIn;
  }

  public Date getExpectedMoveOut() {
    return expectedMoveOut;
  }

  public void setExpectedMoveOut(Date expectedMoveOut) {
    this.expectedMoveOut = expectedMoveOut;
  }

  public Date getMoveIn() {
    return moveIn;
  }

  public void setMoveIn(Date moveIn) {
    this.moveIn = moveIn;
  }

  public Date getMoveOut() {
    return moveOut;
  }

  public void setMoveOut(Date moveOut) {
    this.moveOut = moveOut;
  }

  public Boolean getIsProspect() {
    return isProspect;
  }

  public void setIsProspect(Boolean isProspect) {
    this.isProspect = isProspect;
  }

  public Boolean getIsFuture() {
    return isFuture;
  }

  public void setIsFuture(Boolean isFuture) {
    this.isFuture = isFuture;
  }

  public Boolean getIsCurrent() {
    return isCurrent;
  }

  public void setIsCurrent(Boolean isCurrent) {
    this.isCurrent = isCurrent;
  }

  public Boolean getOnNotice() {
    return onNotice;
  }

  public void setOnNotice(Boolean onNotice) {
    this.onNotice = onNotice;
  }

  public Boolean getIsPast() {
    return isPast;
  }

  public void setIsPast(Boolean isPast) {
    this.isPast = isPast;
  }

  public List<Notes> getNotes() {
    return notes;
  }

  public void setNotes(List<Notes> notes) {
    this.notes = notes;
  }

  public List<Residents> getResidents() {
    return residents;
  }

  public void setResidents(List<Residents> residents) {
    this.residents = residents;
  }

  public Apartments getOccApt() {
    return occApt;
  }

  public void setOccApt(Apartments occApt) {
    this.occApt = occApt;
  }
  
  
  
  
}
