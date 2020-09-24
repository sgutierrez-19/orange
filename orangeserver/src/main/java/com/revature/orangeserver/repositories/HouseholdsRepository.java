package com.revature.orangeserver.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.revature.orangeserver.models.Households;

public interface HouseholdsRepository extends JpaRepository<Households, Integer> {
  
  @Query("FROM Households h WHERE h.isCurrent = true")
  public List<Households> getCurrent();
  
  @Query("FROM Households h WHERE h.isFuture = true")
  public List<Households> getFuture();
  
  @Query("FROM Households h WHERE h.isProspect = true")
  public List<Households> getProspect();
  
}
