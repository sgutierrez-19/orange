package com.revature.orangeserver.repositories;

import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.revature.orangeserver.models.LedgerRows;
import com.revature.orangeserver.models.Ledgers;

public interface LedgerRowsRepository extends JpaRepository<LedgerRows, Integer> {

  @Query("FROM LedgerRows l WHERE l.ledgerId = :ledger")
  public Set<LedgerRows> findByLedger(Ledgers ledger);
}
