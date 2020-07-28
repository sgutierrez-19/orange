package com.revature.orangeserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(schema = "something", name ="hh_apts")
public class HhApts {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
  @OneToOne
  @JoinColumn(name = "household_id")
  private Households householdId;
  
  @OneToOne
  @JoinColumn(name = "apartment_id")
  private Apartments apartmentId;
  
  @Column(name = "is_reserved")
  private Boolean isReserved;
  
  @Column(name = "is_occupied")
  private Boolean isOccupied;
}
