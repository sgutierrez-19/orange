package com.revature.orangeserver.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(schema = "something", name="categories")
public class Categories {

  @Id
  @Column(name = "category_id")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer categoryId;
  
  @Column(name = "name")
  private String name;

  public Categories() {
    super();
  }

  public Categories(Integer categoryId, String name) {
    super();
    this.categoryId = categoryId;
    this.name = name;
  }

  public Integer getCategoryId() {
    return categoryId;
  }

  public void setCategoryId(Integer categoryId) {
    this.categoryId = categoryId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return "Categories [categoryId=" + categoryId + ", name=" + name + "]";
  }
  
  
}
