package com.revature.orangeserver.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.repositories.HouseholdsRepository;

@Service
public class HouseholdService {

  @Autowired
  HouseholdsRepository hhRepo;
  
  public Households getById(Integer id) throws Exception {
    Optional<Households> household = hhRepo.findById(id);
    if (household.isPresent()) {
      return household.get();
    } else {
      throw new Exception("Household not found");
    }
  }
  
  public List<Households> getAllHouseholds() throws Exception {
    List<Households> hhList = hhRepo.findAll();
    return hhList;
  }
  
  public List<Households> getCurrentHouseholds() throws Exception {
    List<Households> hhList = hhRepo.getCurrent();
    return hhList;
  }
  
  public List<Households> getFutureHouseholds() throws Exception {
    List<Households> hhList = hhRepo.getFuture();
    return hhList;
  }
  
  public List<Households> getProspectHouseholds() throws Exception {
    List<Households> hhList = hhRepo.getProspect();
    return hhList;
  }
  
  public Households create(Households hh) throws Exception {
    hh.setHouseholdId(hhRepo.findAll().get(hhRepo.findAll().size()-1).getHouseholdId() + 1);
    return hhRepo.save(hh);
  }
  
  
  
  public Households updateHousehold(Households h) throws Exception {
    return hhRepo.save(h);
  }
}
