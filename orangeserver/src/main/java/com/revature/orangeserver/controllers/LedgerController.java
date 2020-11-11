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
import com.revature.orangeserver.dto.LedgReqDto;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Ledgers;
import com.revature.orangeserver.services.HouseholdService;
import com.revature.orangeserver.services.LedgersService;

@RestController
public class LedgerController {
  
  @Autowired
  LedgersService lService;
  
  @Autowired
  HouseholdService hhService;
  
  @GetMapping("/ledgers")
  public List<Ledgers> getAllLedgers() {
    try {
      return lService.getAll();
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @GetMapping("/ledger/{hhId}")
  public Ledgers getLedger(@PathVariable Integer hhId) {
    try {
      return lService.findLedger(hhId);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @PostMapping("/new-ledger")
  public Ledgers newLedger(@RequestBody LedgReqDto reqObj) {
    try {
      Households hh = hhService.getById(reqObj.getHhId());
      return lService.addNewLedger(hh);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  }


