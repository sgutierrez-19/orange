package com.revature.orangeserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.Formula;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "something", name="residents")
public class Residents {

  @Id
  @Column(name = "resident_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer residentId;
  
  @Column(name = "first_name")
  private String firstName;
  
  @Column(name = "last_name")
  private String lastName;
  
  @Column(name = "phone_number")
  private String phoneNumber;
  
  @Column(name = "curr_address")
  private String currAddress;
  
  @Column(name = "curr_city")
  private String currCity;
  
  @Column(name = "curr_state")
  private String currState;
  
  @Column(name = "curr_zip")
  private String currZip;
  
  @ManyToOne
  @JsonIgnoreProperties({"residents"})
  @JoinColumn(name = "household_id")
  private Households householdId;

  @Formula(value = " concat(first_name, ' ', last_name) ")
  private String fullName;

  public Residents() {
    super();
    // TODO Auto-generated constructor stub
  }
  
  public Residents(Integer residentId, String firstName, String lastName, String phoneNumber,
      String currAddress, String currCity, String currState, String currZip, Households householdId) {
    super();
    this.residentId = residentId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.currAddress = currAddress;
    this.currCity = currCity;
    this.currState = currState;
    this.currZip = currZip;
    this.householdId = householdId;
  }

  public Residents(Integer residentId, String firstName, String lastName, String phoneNumber,
      String currAddress, String currCity, String currState, String currZip, Households householdId,
      String fullName) {
    super();
    this.residentId = residentId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.currAddress = currAddress;
    this.currCity = currCity;
    this.currState = currState;
    this.currZip = currZip;
    this.householdId = householdId;
    this.fullName = fullName;
  }

  public Integer getResidentId() {
    return residentId;
  }

  public void setResidentId(Integer residentId) {
    this.residentId = residentId;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getPhoneNumber() {
    return phoneNumber;
  }

  public void setPhoneNumber(String phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  public String getCurrAddress() {
    return currAddress;
  }

  public void setCurrAddress(String currAddress) {
    this.currAddress = currAddress;
  }

  public String getCurrCity() {
    return currCity;
  }

  public void setCurrCity(String currCity) {
    this.currCity = currCity;
  }

  public String getCurrState() {
    return currState;
  }

  public void setCurrState(String currState) {
    this.currState = currState;
  }

  public String getCurrZip() {
    return currZip;
  }

  public void setCurrZip(String currZip) {
    this.currZip = currZip;
  }

  public Households getHouseholdId() {
    return householdId;
  }

  public void setHouseholdId(Households householdId) {
    this.householdId = householdId;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  @Override
  public String toString() {
    return "Residents [residentId=" + residentId + ", firstName=" + firstName + ", lastName="
        + lastName + ", phoneNumber=" + phoneNumber + ", currAddress=" + currAddress + ", currCity="
        + currCity + ", currState=" + currState + ", currZip=" + currZip + ", householdId="
        + householdId + ", fullName=" + fullName + "]";
  }
  
  
}
