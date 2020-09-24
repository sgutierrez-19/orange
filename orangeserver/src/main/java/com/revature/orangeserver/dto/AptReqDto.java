package com.revature.orangeserver.dto;

import lombok.Data;

@Data
public class AptReqDto {

  private String aptNumber;
  private Integer householdId;
  private String date;
  
  public AptReqDto() {
    super();
  }

  public AptReqDto(String aptNumber, Integer householdId, String date) {
    super();
    this.aptNumber = aptNumber;
    this.householdId = householdId;
    this.date = date;
  }

  public String getAptNumber() {
    return aptNumber;
  }

  public void setAptNumber(String aptNumber) {
    this.aptNumber = aptNumber;
  }

  public Integer getHouseholdId() {
    return householdId;
  }

  public void setHouseholdId(Integer householdId) {
    this.householdId = householdId;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  @Override
  public String toString() {
    return "AptReqDto [aptNumber=" + aptNumber + ", householdId=" + householdId + ", date=" + date
        + "]";
  }

  
  
}
