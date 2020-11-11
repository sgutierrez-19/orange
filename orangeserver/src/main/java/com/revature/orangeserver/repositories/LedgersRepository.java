package com.revature.orangeserver.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Ledgers;


public interface LedgersRepository extends JpaRepository<Ledgers, Integer> {
  
  @Query("FROM Ledgers l WHERE l.householdId = :hh")
  public Optional<Ledgers> findByHh(Households hh);

}
