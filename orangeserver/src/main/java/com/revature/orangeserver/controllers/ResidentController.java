package com.revature.orangeserver.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.orangeserver.dto.ResReqDto;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Residents;
import com.revature.orangeserver.services.HouseholdService;
import com.revature.orangeserver.services.ResidentsService;

@RestController
public class ResidentController {
  
  @Autowired
  ResidentsService rService;
  
  @Autowired
  HouseholdService hhService;

  @GetMapping("/resident/{resId}")
  public Residents getRes(@PathVariable Integer resId) {
    try {
      return rService.getResById(resId);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/resident-name/{name}")
  public List<Residents> getResName(@PathVariable String name) {
    try {
      return rService.getResByName(name.toLowerCase());
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/all-residents")
  public List<Residents> getAll() {
    try {
      return rService.getAllResidents();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/current-residents")
  public List<Residents> getAllCurrentResidents() {
    try {
      return rService.getAllCurrent();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/future-residents")
  public List<Residents> getAllFutureResidents() {
    try {
      return rService.getAllFuture();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/past-residents")
  public List<Residents> getAllPastResidents() {
    try {
      return rService.getAllPast();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/prospective-residents")
  public List<Residents> getAllProspectiveResidents() {
    try {
      return rService.getAllProspective();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @PostMapping("/new-resident")
  public Residents newRes(@RequestBody ResReqDto reqObj) {
    try {
      Households reqHh = hhService.getById(reqObj.getHouseholdId());
      Residents newRes = new Residents(0, reqObj.getFirstName(), reqObj.getLastName(), reqObj.getPhoneNumber(), reqObj.getCurrAddress(), reqObj.getCurrCity(), reqObj.getCurrState(), reqObj.getCurrZip(), reqHh);
      rService.create(newRes);
      return newRes;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
      }
  }
  
  
  
  
  
  
  
  
}
