package com.revature.orangeserver.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.orangeserver.models.Categories;
import com.revature.orangeserver.services.CategoriesService;

@RestController
public class CategoriesController {

  @Autowired
  CategoriesService cService;
  
  @GetMapping("/categories")
  public List<Categories> getCategories() {
    try {
      return cService.getAllCategories();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
}
