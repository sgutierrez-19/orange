package com.revature.orangeserver.dto;

public class ResReqDto {


  private String firstName;

  private String lastName;

  private String phoneNumber;

  private String currAddress;

  private String currCity;

  private String currState;

  private String currZip;
  
  private Integer householdId;

  public ResReqDto() {
    super();
    // TODO Auto-generated constructor stub
  }

  public ResReqDto(String firstName, String lastName, String phoneNumber, String currAddress,
      String currCity, String currState, String currZip, Integer householdId) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.currAddress = currAddress;
    this.currCity = currCity;
    this.currState = currState;
    this.currZip = currZip;
    this.householdId = householdId;
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

  public Integer getHouseholdId() {
    return householdId;
  }

  public void setHouseholdId(Integer householdId) {
    this.householdId = householdId;
  }

  @Override
  public String toString() {
    return "ResReqDto [firstName=" + firstName + ", lastName=" + lastName + ", phoneNumber="
        + phoneNumber + ", currAddress=" + currAddress + ", currCity=" + currCity + ", currState="
        + currState + ", currZip=" + currZip + ", householdId=" + householdId + "]";
  }

  
 
}
