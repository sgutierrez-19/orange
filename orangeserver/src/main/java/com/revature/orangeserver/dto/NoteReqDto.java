package com.revature.orangeserver.dto;

import lombok.Data;

@Data
public class NoteReqDto {

  private Integer householdId;
  private String date;
  private String note;
  
  public NoteReqDto() {
    super();
    // TODO Auto-generated constructor stub
  }
  
  public NoteReqDto(Integer householdId, String date, String note) {
    super();
    this.householdId = householdId;
    this.date = date;
    this.note = note;
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

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  @Override
  public String toString() {
    return "NoteReqDto [householdId=" + householdId + ", date=" + date + ", note=" + note + "]";
  }
  
  
}
