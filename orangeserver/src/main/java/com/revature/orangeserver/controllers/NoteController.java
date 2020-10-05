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
import com.revature.orangeserver.dto.NoteReqDto;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Notes;
import com.revature.orangeserver.services.HouseholdService;
import com.revature.orangeserver.services.NoteService;

@RestController
public class NoteController {
  
  @Autowired
  NoteService nService;
  
  @Autowired
  HouseholdService hhService;
  
  @GetMapping("/notes/{householdId}")
  public List<Notes> getNotes(@PathVariable Integer householdId) {
    try {
      return nService.getNotesByHouseholdId(householdId);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }

  @PostMapping("/new-note")
  public Notes newNote(@RequestBody NoteReqDto reqObj) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      java.util.Date date = sdf.parse(reqObj.getDate());
      long millis = date.getTime();
      Date timestamp = new Date(millis);
      Households hh = hhService.getById(reqObj.getHouseholdId());
      Notes note = new Notes(0, hh, timestamp, reqObj.getNote());
      nService.create(note);
      return note;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }


}
