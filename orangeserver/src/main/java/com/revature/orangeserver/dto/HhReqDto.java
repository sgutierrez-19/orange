package com.revature.orangeserver.dto;

import lombok.Data;

@Data
public class HhReqDto {

  private String date;

  public HhReqDto() {
    super();
    // TODO Auto-generated constructor stub
  }

  public HhReqDto(String date) {
    super();
    this.date = date;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  @Override
  public String toString() {
    return "HhReqDto [date=" + date + "]";
  }
  
  
}
