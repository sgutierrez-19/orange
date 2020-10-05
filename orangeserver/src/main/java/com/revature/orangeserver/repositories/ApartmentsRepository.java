package com.revature.orangeserver.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.revature.orangeserver.models.Apartments;

public interface ApartmentsRepository extends JpaRepository<Apartments, Integer> {
  
  <S extends Apartments> S save(S entity);
  
  @Query("SELECT a FROM Apartments a WHERE a.apartmentNumber = :aptNum")
  public Optional<Apartments> getByAptNum(String aptNum);
  
  @Query("FROM Apartments a WHERE lower(a.apartmentNumber) LIKE %:aptNum%")
  public List<Apartments> getByLikeAptNum(String aptNum);
  
//  @Query("SELECT a FROM Apartments a WHERE a.occupiedBy.onNotice = true")
  @Query("FROM Apartments a WHERE a.isRentable = true")
  public List<Apartments> getUnreserved();
}
