package com.revature.orangeserver.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Ledgers;
import com.revature.orangeserver.repositories.LedgersRepository;

@Service
public class LedgersService {
  
  @Autowired
  LedgersRepository lRepo;
  
  @Autowired
  HouseholdService hhService;
  
  public List<Ledgers> getAll() throws Exception {
    List<Ledgers> ledgers = lRepo.findAll();
    return ledgers;
  }
  
  public Ledgers findLedger(Integer hhId) throws Exception {
    System.out.println("before");
    Households hh = hhService.getById(hhId);
    Optional<Ledgers> ledger = lRepo.findByHh(hh);
    System.out.println("after");
    if (ledger.isPresent()) {
      return ledger.get();
    } else {
      throw new Exception("Ledger not found with household ID #" + hhId);
    }
  }
  
  public Ledgers addNewLedger(Households hh) throws Exception {
    Ledgers ledger = new Ledgers(0, hh, "0.00");
    ledger.setLedgerId(lRepo.findAll().get(lRepo.findAll().size()-1).getLedgerId() + 1);
    return lRepo.save(ledger);
  }

}
