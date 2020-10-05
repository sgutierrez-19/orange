package com.revature.orangeserver.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Notes;
import com.revature.orangeserver.repositories.HouseholdsRepository;
import com.revature.orangeserver.repositories.NotesRepository;

@Service
public class NoteService {

  @Autowired
  NotesRepository nRepo;
  
  @Autowired
  HouseholdsRepository hhRepo;
  
  public List<Notes> getNotesByHouseholdId(Integer householdId) throws Exception {
    Optional<Households> hh = hhRepo.findById(householdId);
    if (hh.isPresent()) {
      List<Notes> notes = nRepo.getByHh(hh.get());
      return notes;
    } else {
      throw new Exception("Household not found.");
    }
  }
  
  public Notes create(Notes n) throws Exception {
    n.setNoteId(nRepo.findAll().get(nRepo.findAll().size()-1).getNoteId() + 1);
    return nRepo.save(n);
  }
  
}
