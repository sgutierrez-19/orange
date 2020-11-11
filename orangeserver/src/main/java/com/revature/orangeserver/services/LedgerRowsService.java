package com.revature.orangeserver.services;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Categories;
import com.revature.orangeserver.models.LedgerRows;
import com.revature.orangeserver.models.Ledgers;
import com.revature.orangeserver.repositories.LedgerRowsRepository;

@Service
public class LedgerRowsService {

  @Autowired
  LedgerRowsRepository lrRepo;
  
  @Autowired
  LedgersService lService;
  
  @Autowired
  CategoriesService cService;
  
  public Set<LedgerRows> getRows(Integer hhId) throws Exception {
    Ledgers ledger = lService.findLedger(hhId);
    Set<LedgerRows> rows = lrRepo.findByLedger(ledger);
    return rows;
  }
  
  public LedgerRows createLRow(Ledgers ledger, Integer catId, Date date, String desc, String amount) throws Exception {
    Categories category = cService.getCat(catId);
    LedgerRows newRow = new LedgerRows(0, ledger, category, date, desc, amount);
    newRow.setRowId(lrRepo.findAll().get(lrRepo.findAll().size()-1).getRowId() + 1);
    return lrRepo.save(newRow);    
  }
}
