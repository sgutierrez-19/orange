package com.revature.orangeserver.controllers;

import java.text.SimpleDateFormat;
import java.util.List;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.orangeserver.dto.AptReqDto;
import com.revature.orangeserver.models.Apartments;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.services.ApartmentsService;
import com.revature.orangeserver.services.HouseholdService;

@RestController
public class ApartmentController {
  
  @Autowired
  ApartmentsService aptService;
  
  @Autowired 
  HouseholdService hhService;

  
  // GET apartments
  @GetMapping("/apartments")
  public List<Apartments> getAllApts() {
    try {
      return aptService.getAllApartments();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/apartment/{id}")
  public Apartments getApartment(@PathVariable Integer id) {
    try {
      return aptService.getById(id);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/apartment-num/{aptNum}")
  public Apartments getApartmentByNum(@PathVariable String aptNum) {
    try {
      return aptService.getByAptNumber(aptNum.toUpperCase());
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/get-available")
  public List<Apartments> getAllAvailable() {
    try {
      return aptService.getAllAvailableApts();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  // RESERVE apartment
  // apt reserved by set
  // household changed to future
  // household expected move in date set
  @PatchMapping("/reserve")
  public Apartments reserveApartment(@RequestBody AptReqDto reqObj) {
    try {
      Apartments apt = aptService.getByAptNumber(reqObj.getAptNumber());
      Households hh =  hhService.getById(reqObj.getHouseholdId());
      if (apt.getIsRentable() == false) {
        throw new Exception("Apartment #" + apt.getApartmentNumber() + " is not available to reserved.");
      }
      apt.setReservedBy(hh);
      apt.setIsRentable(false);
      aptService.updateApartment(apt);
      hh.setIsProspect(false);
      hh.setIsFuture(true);
      hh.setIsCurrent(false);
      hh.setOnNotice(false);
      hh.setIsPast(false);
      Date expMoveIn = new Date(reqObj.getDate());
      hh.setExpectedMoveIn(expMoveIn);
      hhService.updateHousehold(hh);
//      return "Household Id " + hh.getId() + " has reserved apartment #" + apt.getApartmentNumber() + " with an expected move-in date of " + hh.getExpectedMoveIn();      
      return apt;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  
  // MOVE IN
  // apt occupied by set
  // household move in date set
  // household is future ---> is current
  @PatchMapping("/move-in")
  public Apartments moveIn(@RequestBody AptReqDto reqObj) {
    try {
      Apartments apt = aptService.getByAptNumber(reqObj.getAptNumber());
      Households hh = hhService.getById(reqObj.getHouseholdId());
      if (apt.getReservedBy() != hh) {
        throw new Exception("You cannot move in a household that hasn't reserved this apartment");
      }
      apt.setOccupiedBy(hh);
      apt.setReservedBy(null);
      Date expMoveIn = new Date(reqObj.getDate());
      hh.setMoveIn(expMoveIn);
      hh.setIsProspect(false);
      hh.setIsFuture(false);
      hh.setIsCurrent(true);
      hh.setOnNotice(false);
      hh.setIsPast(false);
      aptService.updateApartment(apt);
      hhService.updateHousehold(hh);
//      return "Household Id " + hh.getId() + " has moved in to apartment #" + apt.getApartmentNumber() + " as of " + hh.getMoveIn();
      return apt;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  
  // ON NOTICE
  // apt reserved by nulled
  // household. expected_move_out - set
  // household.onnotice => true
  @PatchMapping("/notice")
  public Apartments onNotice(@RequestBody AptReqDto reqObj) {
    try {
      Apartments apt = aptService.getByAptNumber(reqObj.getAptNumber());
      Households hh = hhService.getById(reqObj.getHouseholdId());
      if (apt.getOccupiedBy() != hh) {
        throw new Exception("You cannot give notice to an apartment the household doesn't occupy.");
      }
      apt.setIsRentable(true);
      Date expMoveOut = new Date(reqObj.getDate());
      hh.setExpectedMoveOut(expMoveOut);
      hh.setIsProspect(false);
      hh.setIsFuture(false);
      hh.setIsCurrent(true);
      hh.setOnNotice(true);
      hh.setIsPast(false);
      aptService.updateApartment(apt);
      hhService.updateHousehold(hh);
      return apt;
//      return "Household Id " + hh.getId() + " has given notice to vacate for apartment #" + apt.getApartmentNumber() + " with an expected move out date of " + hh.getExpectedMoveOut();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
    }
  };
  // MOVE OUT
  // apt occupied_by null
  // household.move out date - set
  // household. is curr/on notice - false
  // household. ispast - true
  @PatchMapping("/move-out")
  public Households moveOut(@RequestBody AptReqDto reqObj) {
    try {
      Apartments apt = aptService.getByAptNumber(reqObj.getAptNumber());
      Households hh = hhService.getById(reqObj.getHouseholdId());
      if (hh.getOnNotice() == false) {
        throw new Exception("An household must first be put on notice in order to move out.");
      } else if (apt.getOccupiedBy() != hh) {
        throw new Exception("Can't move out apartment #" + apt.getApartmentNumber() + " as current occupant(s) isn't the requests household");
      }
      apt.setOccupiedBy(null);
      Date moveOut = new Date(reqObj.getDate());
      hh.setMoveOut(moveOut);
      hh.setIsProspect(false);
      hh.setIsFuture(false);
      hh.setIsCurrent(false);
      hh.setOnNotice(false);
      hh.setIsPast(true);
      aptService.updateApartment(apt);
      hhService.updateHousehold(hh);
      return hh;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
    }
  }
}
