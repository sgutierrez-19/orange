package com.revature.orangeserver.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.services.HouseholdService;

@RestController
public class HouseholdController {
  
  @Autowired
  HouseholdService hhService;
  
  //Get households
  @GetMapping("/all-households")
  public List<Households> getAllHh() {
    try {
      return hhService.getAllHouseholds();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  //Get households
  @GetMapping("/household/{id}")
  public Households getHh(@PathVariable Integer id) {
    try {
      return hhService.getById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }

  // Update prospect to future res
  
  // update future 
}
