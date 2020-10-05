package com.revature.orangeserver.models;

import java.sql.Date;
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
  @Column(name = "household_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer householdId;
  
  @Column(name = "expected_move_in", nullable=true)
  private Date expectedMoveIn;
  
  @Column(name = "expected_move_out", nullable=true)
  private Date expectedMoveOut;
  
  @Column(name = "move_in", nullable=true)
  private Date moveIn;
  
  @Column(name = "move_out", nullable=true)
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
  
  @Column(name = "prev_apt")
  private String prevApt;
  
  @JsonIgnoreProperties({"households", "occupiedBy", "reservedBy", "occupying", "reserving"})
  @OneToOne(mappedBy = "occupiedBy")
  private Apartments occupying;
  
  @JsonIgnoreProperties({"households", "occupiedBy", "reservedBy", "occupying", "reserving"})
  @OneToOne(mappedBy = "reservedBy")
  private Apartments reserving;
  

  @JsonIgnoreProperties({"households","apartments"})
  @OneToMany(mappedBy = "householdId")
  private List<Residents> residents;


  public Households() {
    super();
    // TODO Auto-generated constructor stub
  }
  
  public Households(Integer householdId, Date expectedMoveIn, Date expectedMoveOut, Date moveIn,
      Date moveOut, Boolean isProspect, Boolean isFuture, Boolean isCurrent, Boolean onNotice,
      Boolean isPast) {
    super();
    this.householdId = householdId;
    this.expectedMoveIn = expectedMoveIn;
    this.expectedMoveOut = expectedMoveOut;
    this.moveIn = moveIn;
    this.moveOut = moveOut;
    this.isProspect = isProspect;
    this.isFuture = isFuture;
    this.isCurrent = isCurrent;
    this.onNotice = onNotice;
    this.isPast = isPast;
  }


  public Households(Integer householdId, Date expectedMoveIn, Date expectedMoveOut, Date moveIn,
      Date moveOut, Boolean isProspect, Boolean isFuture, Boolean isCurrent, Boolean onNotice,
      Boolean isPast, String prevApt, Apartments occupying, Apartments reserving,
      List<Residents> residents) {
    super();
    this.householdId = householdId;
    this.expectedMoveIn = expectedMoveIn;
    this.expectedMoveOut = expectedMoveOut;
    this.moveIn = moveIn;
    this.moveOut = moveOut;
    this.isProspect = isProspect;
    this.isFuture = isFuture;
    this.isCurrent = isCurrent;
    this.onNotice = onNotice;
    this.isPast = isPast;
    this.prevApt = prevApt;
    this.occupying = occupying;
    this.reserving = reserving;
    this.residents = residents;
  }


  public Integer getHouseholdId() {
    return householdId;
  }


  public void setHouseholdId(Integer householdId) {
    this.householdId = householdId;
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


  public String getPrevApt() {
    return prevApt;
  }


  public void setPrevApt(String prevApt) {
    this.prevApt = prevApt;
  }


  public Apartments getOccupying() {
    return occupying;
  }


  public void setOccupying(Apartments occupying) {
    this.occupying = occupying;
  }


  public Apartments getReserving() {
    return reserving;
  }


  public void setReserving(Apartments reserving) {
    this.reserving = reserving;
  }


  public List<Residents> getResidents() {
    return residents;
  }


  public void setResidents(List<Residents> residents) {
    this.residents = residents;
  }


  @Override
  public String toString() {
    return "Households [householdId=" + householdId + ", expectedMoveIn=" + expectedMoveIn
        + ", expectedMoveOut=" + expectedMoveOut + ", moveIn=" + moveIn + ", moveOut=" + moveOut
        + ", isProspect=" + isProspect + ", isFuture=" + isFuture + ", isCurrent=" + isCurrent
        + ", onNotice=" + onNotice + ", isPast=" + isPast + ", prevApt=" + prevApt + ", occupying="
        + occupying + ", reserving=" + reserving + ", residents=" + residents + "]";
  }


  
}
