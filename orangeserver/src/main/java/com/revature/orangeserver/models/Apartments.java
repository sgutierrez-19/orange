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
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
  @Column(name = "apartment_number")  
  private String apartmentNumber;
  
//  @OneToOne(cascade = CascadeType.ALL)
//  @JoinColumn(name = "reserved_by", referencedColumnName = "id")  
//  private Integer reservedBy;
  
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "occupied_by", referencedColumnName = "id")
  private Households occupiedBy;
  
  @Column(name = "has_refrig")  
  private Boolean hasRefrig;
  
  @Column(name = "has_wash_dry")   
  private Boolean hasWashDry;
  
  @Column(name = "has_view") 
  private Boolean hasView;

//  @JsonIgnoreProperties({"apartments"})
//  @OneToMany(mappedBy = "apartments", cascade = CascadeType.MERGE)
//  private Households household;

  public Apartments() {
    super();
    // TODO Auto-generated constructor stub
  }

  public Apartments(Integer id, String apartmentNumber, Integer occupiedBy, Boolean hasRefrig,
      Boolean hasWashDry, Boolean hasView, Households household) {
    super();
    this.id = id;
    this.apartmentNumber = apartmentNumber;
    this.occupiedBy = occupiedBy;
    this.hasRefrig = hasRefrig;
    this.hasWashDry = hasWashDry;
    this.hasView = hasView;
//    this.household = household;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getApartmentNumber() {
    return apartmentNumber;
  }

  public void setApartmentNumber(String apartmentNumber) {
    this.apartmentNumber = apartmentNumber;
  }

  public Integer getOccupiedBy() {
    return occupiedBy;
  }

  public void setOccupiedBy(Integer occupiedBy) {
    this.occupiedBy = occupiedBy;
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

//  public Households getHousehold() {
//    return household;
//  }
//
//  public void setHousehold(Households household) {
//    this.household = household;
//  }

  
}
