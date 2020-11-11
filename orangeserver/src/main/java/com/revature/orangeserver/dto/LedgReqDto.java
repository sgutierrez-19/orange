package com.revature.orangeserver.dto;

import lombok.Data;

@Data
public class LedgReqDto {

  private Integer hhId;

  public LedgReqDto() {
    super();
    // TODO Auto-generated constructor stub
  }

  public LedgReqDto(Integer hhId) {
    super();
    this.hhId = hhId;
  }

  public Integer getHhId() {
    return hhId;
  }

  public void setHhId(Integer hhId) {
    this.hhId = hhId;
  }

  @Override
  public String toString() {
    return "LedgReqDto [hhId=" + hhId + "]";
  }
  
  
}
