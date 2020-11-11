package com.revature.orangeserver.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Categories;
import com.revature.orangeserver.repositories.CategoriesRepository;

@Service
public class CategoriesService {

  @Autowired
  CategoriesRepository cRepo;
  
  public List<Categories> getAllCategories() throws Exception {
    return cRepo.findAll();
  }
  
  public Categories getCat(Integer id) throws Exception {
    Optional<Categories> category = cRepo.findById(id);
    if (category.isPresent()) {
      return category.get();
    } else {
      throw new Exception("Could not find category with that id");
    }
  }
}
