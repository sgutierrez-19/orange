package com.revature.orangeserver.repositories;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.revature.orangeserver.models.Residents;

public interface ResidentsRepository extends JpaRepository<Residents, Integer> {

  
  @Query("FROM Residents r INNER JOIN Households h ON r.householdId = h.householdId WHERE h.isCurrent = true")
  public List<Residents> getCurrent();
  
  @Query("FROM Residents r INNER JOIN Households h ON r.householdId = h.householdId WHERE h.isFuture = true")
  public List<Residents> getFuture();
  
  @Query("FROM Residents r INNER JOIN Households h ON r.householdId = h.householdId WHERE h.isPast = true")
  public List<Residents> getPast();
  
  @Query("FROM Residents r INNER JOIN Households h ON r.householdId = h.householdId WHERE h.isProspect = true")
  public List<Residents> getProspective();
}
