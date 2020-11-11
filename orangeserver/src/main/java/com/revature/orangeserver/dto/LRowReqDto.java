package com.revature.orangeserver.dto;

import lombok.Data;

@Data
public class LRowReqDto {
  private Integer hhId;
  private Integer catId;
  private String date;
  private String description;
  private String amount;
  
  public LRowReqDto() {
    super();
    // TODO Auto-generated constructor stub
  }

  public LRowReqDto(Integer hhId, Integer catId, String date, String description,
      String amount) {
    super();
    this.hhId = hhId;
    this.catId = catId;
    this.date = date;
    this.description = description;
    this.amount = amount;
  }

  public Integer getHhId() {
    return hhId;
  }

  public void setHhId(Integer hhId) {
    this.hhId = hhId;
  }

  public Integer getCatId() {
    return catId;
  }

  public void setCatId(Integer catId) {
    this.catId = catId;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getAmount() {
    return amount;
  }

  public void setAmount(String amount) {
    this.amount = amount;
  }

  @Override
  public String toString() {
    return "LRowReqDto [hhId=" + hhId + ", catId=" + catId + ", date=" + date + ", description="
        + description + ", amount=" + amount + "]";
  }


}
