package com.revature.orangeserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.orangeserver.models.Households;

public interface HouseholdsRepository extends JpaRepository<Households, Integer> {

}
