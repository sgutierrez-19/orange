package com.revature.orangeserver.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.revature.orangeserver.models.Households;
import com.revature.orangeserver.models.Notes;

public interface NotesRepository  extends JpaRepository<Notes, Integer> {

  @Query("FROM Notes n WHERE n.householdId = :household")
  public List<Notes> getByHh(Households household);
}
