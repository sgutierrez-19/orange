package com.revature.orangeserver.models;

import java.util.Date;
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
@Table(schema = "something", name = "households")
public class Households {

  @Id
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  
  @Column(name = "expected_move_in")
  private Date expectedMoveIn;
  
  @Column(name = "expected_move_out")
  private Date expectedMoveOut;
  
  @Column(name = "move_in")
  private Date moveIn;
  
  @Column(name = "move_out")
  private Date moveOut;
  
  @Column(name = "is_prospect")
  private Boolean isProspect;
  
  @Column(name = "is_future")
  private Boolean isFuture;
  
  @Column(name = "is_current")
  private Boolean isCurrent;
  
  @Column(name = "on_notice")
  private Boolean onNotice;
  
  @Column(name = "is_past")
  private Boolean isPast;
  
  @JsonIgnoreProperties({"households"})
  @OneToMany(mappedBy = "householdId", cascade = CascadeType.MERGE)
  private List<Notes> notes;
  
  @JsonIgnoreProperties({"households"})
  @OneToMany(mappedBy = "householdId", cascade = CascadeType.MERGE)
  private List<Residents> residents;

  @JsonIgnoreProperties({"households"})
  @OneToOne(mappedBy = "householdId", cascade = CascadeType.MERGE)
  private Households household;
  
  @JsonIgnoreProperties({"households"})
  @OneToOne(mappedBy = "apartmentId", cascade = CascadeType.MERGE)
  private Apartments apartment;
  
  
}
