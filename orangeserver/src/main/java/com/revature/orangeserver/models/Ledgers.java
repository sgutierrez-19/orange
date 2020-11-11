package com.revature.orangeserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "something", name="ledgers")
public class Ledgers {

  @Id
  @Column(name = "ledger_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer ledgerId;
  
  @OneToOne(fetch = FetchType.LAZY)
  @JsonIgnoreProperties({"ledgers", "hibernateLazyInitializer", "householdId"})
  @JoinColumn(name = "household_id", referencedColumnName = "household_id")
  private Households householdId;
  
  @Column(name = "balance")
  private String balance;

  public Ledgers() {
    super();
  }

  public Ledgers(Integer ledgerId, Households householdId, String balance) {
    super();
    this.ledgerId = ledgerId;
    this.householdId = householdId;
    this.balance = balance;
  }

  public Integer getLedgerId() {
    return ledgerId;
  }

  public void setLedgerId(Integer ledgerId) {
    this.ledgerId = ledgerId;
  }

  public Households getHouseholdId() {
    return householdId;
  }

  public void setHouseholdId(Households householdId) {
    this.householdId = householdId;
  }

  public String getBalance() {
    return balance;
  }

  public void setBalance(String balance) {
    this.balance = balance;
  }

  @Override
  public String toString() {
    return "Ledgers [ledgerId=" + ledgerId + ", householdId=" + householdId + ", balance=" + balance
        + "]";
  }
  
  
}
