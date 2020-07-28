package com.revature.orangeserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(schema = "something", name="residents")
public class Residents {

  public Residents() {
    super();
  }

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
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
  @JoinColumn(name = "household_id")
  private Households householdId;

  public Residents(Integer id, String firstName, String lastName, String phoneNumber,
      String currAddress, String currCity, String currState, String currZip,
      Households householdId) {
    super();
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.currAddress = currAddress;
    this.currCity = currCity;
    this.currState = currState;
    this.currZip = currZip;
    this.householdId = householdId;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
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

  @Override
  public String toString() {
    return "Residents [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName
        + ", phoneNumber=" + phoneNumber + ", currAddress=" + currAddress + ", currCity=" + currCity
        + ", currState=" + currState + ", currZip=" + currZip + ", householdId=" + householdId
        + "]";
  }
  
}
