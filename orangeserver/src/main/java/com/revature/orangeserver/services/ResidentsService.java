package com.revature.orangeserver.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Residents;
import com.revature.orangeserver.repositories.ResidentsRepository;

@Service
public class ResidentsService {
  
  @Autowired
  ResidentsRepository rRepo;
  
  public Residents getResById(Integer resId) throws Exception {
    Optional<Residents> res = rRepo.findById(resId);
    if (res.isPresent()) {
      return res.get();
    } else {
      throw new Exception("Resident not found");
    }
  }
  
  public List<Residents> getAllResidents() throws Exception {
    List<Residents> residents = rRepo.findAll();
    return residents;
  }
  
  public List<Residents> getAllCurrent() throws Exception {
    List<Residents> residents = rRepo.getCurrent();
    return residents;
  }
  
  public List<Residents> getAllFuture() throws Exception {
    List<Residents> residents = rRepo.getFuture();
    return residents;
  }
  
  public List<Residents> getAllPast() throws Exception {
    List<Residents> residents = rRepo.getPast();
    return residents;
  }
  
  public List<Residents> getAllProspective() throws Exception {
    List<Residents> residents = rRepo.getProspective();
    return residents;
  }
  
  public Residents create(Residents r) throws Exception {
    r.setResidentId(rRepo.findAll().get(rRepo.findAll().size() - 1).getResidentId() + 1);
    return rRepo.save(r);
  }
  
}
