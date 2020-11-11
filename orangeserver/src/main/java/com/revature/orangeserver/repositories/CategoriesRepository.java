package com.revature.orangeserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.orangeserver.models.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

}
