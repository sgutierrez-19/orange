package com.revature.orangeserver.controllers;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.revature.orangeserver.dto.LRowReqDto;
import com.revature.orangeserver.models.LedgerRows;
import com.revature.orangeserver.models.Ledgers;
import com.revature.orangeserver.repositories.LedgersRepository;
import com.revature.orangeserver.services.LedgerRowsService;
import com.revature.orangeserver.services.LedgersService;

@RestController
public class LedgerRowsController {
  
  @Autowired
  LedgerRowsService lrService;
  
  @Autowired
  LedgersService lService;
  
  @Autowired
  LedgersRepository lRepo;
  
  @GetMapping("ledger-rows/{hhId}")
  public Set<LedgerRows> getRows(@PathVariable Integer hhId) {
    try {
      return lrService.getRows(hhId);
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }
  
  @PostMapping("/new-ledger-row")
  public LedgerRows newLRow(@RequestBody LRowReqDto reqObj) {
    try {
//       create ledgerrow (ledId, catId, Date, desc, amount)
      Ledgers ledger = lService.findLedger(reqObj.getHhId());
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      java.util.Date date = sdf.parse(reqObj.getDate());
      long millis = date.getTime();
      Date sqlDate = new Date(millis);
      LedgerRows newRow = lrService.createLRow(ledger, reqObj.getCatId(), sqlDate, reqObj.getDescription(), reqObj.getAmount());
      
      // adjusting ledger balance based off new ledger row entry
      BigDecimal oldBalance = new BigDecimal(ledger.getBalance());
      BigDecimal amount = new BigDecimal(newRow.getAmount());
      BigDecimal newBalance = oldBalance.add(amount);
      String newBalanceString = newBalance.toString();
      
      ledger.setBalance(newBalanceString);
      lRepo.save(ledger);
      return newRow;
    } catch (Exception e) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
    }
  }

}
