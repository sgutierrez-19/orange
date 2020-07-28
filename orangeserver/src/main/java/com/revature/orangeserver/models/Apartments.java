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
  
  @Column(name = "has_refrig")  
  private Boolean hasRefrig;
  
  @Column(name = "has_wash_dry")   
  private Boolean hasWashDry;
  
  @Column(name = "has_view") 
  private Boolean hasView;

//  @JsonIgnoreProperties({"apartments"})
//  @OneToMany(mappedBy = "apartments", cascade = CascadeType.MERGE)
//  private Households household;

}
