package com.revature.orangeserver.services;

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
  
  public Households updateHousehold(Households h) throws Exception {
    return hhRepo.save(h);
  }
}
