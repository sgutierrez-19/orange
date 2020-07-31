package com.revature.orangeserver.models;

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
@Table(schema = "something", name="apartments")
public class Apartments {

  @Id
  @Column(name = "apartment_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer apartmentId;
  
  @Column(name = "apartment_number")  
  private String apartmentNumber;
  
  @Column(name = "has_refrig")  
  private Boolean hasRefrig;
  
  @Column(name = "has_wash_dry")   
  private Boolean hasWashDry;
  
  @Column(name = "has_view") 
  private Boolean hasView;
  
  @OneToOne
  @JoinColumn(name = "reserved_by") 
  private Households reservedBy;
  
  @OneToOne
  @JoinColumn(name = "occupied_by") 
  private Households occupiedBy;

  public Apartments() {
    super();
  }

  public Apartments(Integer apartmentId, String apartmentNumber, Boolean hasRefrig,
      Boolean hasWashDry, Boolean hasView, Households reservedBy, Households occupiedBy) {
    super();
    this.apartmentId = apartmentId;
    this.apartmentNumber = apartmentNumber;
    this.hasRefrig = hasRefrig;
    this.hasWashDry = hasWashDry;
    this.hasView = hasView;
    this.reservedBy = reservedBy;
    this.occupiedBy = occupiedBy;
  }

  public Integer getApartmentId() {
    return apartmentId;
  }

  public void setApartmentId(Integer apartmentId) {
    this.apartmentId = apartmentId;
  }

  public String getApartmentNumber() {
    return apartmentNumber;
  }

  public void setApartmentNumber(String apartmentNumber) {
    this.apartmentNumber = apartmentNumber;
  }

  public Boolean getHasRefrig() {
    return hasRefrig;
  }

  public void setHasRefrig(Boolean hasRefrig) {
    this.hasRefrig = hasRefrig;
  }

  public Boolean getHasWashDry() {
    return hasWashDry;
  }

  public void setHasWashDry(Boolean hasWashDry) {
    this.hasWashDry = hasWashDry;
  }

  public Boolean getHasView() {
    return hasView;
  }

  public void setHasView(Boolean hasView) {
    this.hasView = hasView;
  }

  public Households getReservedBy() {
    return reservedBy;
  }

  public void setReservedBy(Households reservedBy) {
    this.reservedBy = reservedBy;
  }

  public Households getOccupiedBy() {
    return occupiedBy;
  }

  public void setOccupiedBy(Households occupiedBy) {
    this.occupiedBy = occupiedBy;
  }

  @Override
  public String toString() {
    return "Apartments [apartmentId=" + apartmentId + ", apartmentNumber=" + apartmentNumber
        + ", hasRefrig=" + hasRefrig + ", hasWashDry=" + hasWashDry + ", hasView=" + hasView
        + ", reservedBy=" + reservedBy + ", occupiedBy=" + occupiedBy + "]";
  }

  

}
