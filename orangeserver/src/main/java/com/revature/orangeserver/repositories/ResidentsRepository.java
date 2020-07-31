package com.revature.orangeserver.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.orangeserver.models.Residents;

public interface ResidentsRepository extends JpaRepository<Residents, Integer> {

}
