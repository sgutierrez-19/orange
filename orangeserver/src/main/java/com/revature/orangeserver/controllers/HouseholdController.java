package com.revature.orangeserver.controllers;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.orangeserver.dto.HhReqDto;
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
  
  //Get current households
  @GetMapping("/current-households")
  public List<Households> getCurrentHH() {
    try {
      return hhService.getCurrentHouseholds();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  //Get future households
  @GetMapping("/future-households")
  public List<Households> getFutureHH() {
    try {
      return hhService.getFutureHouseholds();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  //Get prospect households
  @GetMapping("/prospect-households")
  public List<Households> getProspectHH() {
    try {
      return hhService.getProspectHouseholds();
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

  // create household and resident(s)
  @PostMapping("/new-household")
  public Households newHh(@RequestBody HhReqDto reqObj) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      System.out.println(reqObj.getDate());
      java.util.Date date = sdf.parse(reqObj.getDate());
      System.out.println(reqObj.getDate());
      long millis = date.getTime();
      Date expMoveIn = new Date(millis);
      Households newHh = new Households(0, expMoveIn, null, null, null, true, false, false, false, false);
      hhService.create(newHh);
      
      return newHh;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  
  
  
}
