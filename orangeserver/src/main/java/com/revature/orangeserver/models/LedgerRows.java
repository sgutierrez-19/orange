package com.revature.orangeserver.models;

import java.sql.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(schema = "something", name="ledger_rows")
public class LedgerRows {
  
  @Id
  @Column(name = "row_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer rowId;
  
  @ManyToOne
  @JsonIgnoreProperties({"ledger_rows"})
  @JoinColumn(name = "ledger_id")
  private Ledgers ledgerId;
  

  @JsonIgnoreProperties({"ledger_rows"})
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "category_id", referencedColumnName = "category_id")
  private Categories categoryId;
  
  @Column(name = "date_created")
  private Date dateCreated;
  
  @Column(name="description")
  private String description;
  
  @Column(name = "amount")
  private String amount;

  public LedgerRows() {
    super();
  }

  public LedgerRows(Integer rowId, Ledgers ledgerId, Categories categoryId, Date dateCreated,
      String description, String amount) {
    super();
    this.rowId = rowId;
    this.ledgerId = ledgerId;
    this.categoryId = categoryId;
    this.dateCreated = dateCreated;
    this.description = description;
    this.amount = amount;
  }

  public Integer getRowId() {
    return rowId;
  }

  public void setRowId(Integer rowId) {
    this.rowId = rowId;
  }

  public Ledgers getLedgerId() {
    return ledgerId;
  }

  public void setLedgerId(Ledgers ledgerId) {
    this.ledgerId = ledgerId;
  }

  public Categories getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Categories categoryId) {
    this.categoryId = categoryId;
  }

  public Date getDateCreated() {
    return dateCreated;
  }

  public void setDateCreated(Date dateCreated) {
    this.dateCreated = dateCreated;
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
    return "LedgerRows [rowId=" + rowId + ", ledgerId=" + ledgerId + ", categoryId=" + categoryId
        + ", dateCreated=" + dateCreated + ", description=" + description + ", amount=" + amount
        + "]";
  }

}
