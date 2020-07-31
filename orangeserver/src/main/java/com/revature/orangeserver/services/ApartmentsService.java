package com.revature.orangeserver.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.orangeserver.models.Apartments;
import com.revature.orangeserver.repositories.ApartmentsRepository;

@Service
public class ApartmentsService {
  
  @Autowired
  ApartmentsRepository apartmentRepository;
  
  public List<Apartments> getAllApartments() throws Exception {
    List<Apartments> aptList = apartmentRepository.findAll();
    return aptList;
  }
  
  public List<Apartments> getAllAvailableApts() throws Exception {
    List<Apartments> availAptList = apartmentRepository.getUnreserved();
    return availAptList;
  }
  
  public Apartments getById(Integer id) throws Exception {
    Optional<Apartments> apt = apartmentRepository.findById(id);
    if (apt.isPresent()) {
      return apt.get();
    } else {
      throw new Exception("Apartment not found.");
    }
  };
  
  public Apartments getByAptNumber(String aptNum) throws Exception {
    Optional<Apartments> apt = apartmentRepository.getByAptNum(aptNum);
    if (apt.isPresent()) {
      return apt.get();
    } else {
      throw new Exception("Apartment #" + aptNum + " not found.");
    }
  }
  
  public Apartments updateApartment(Apartments apt) {
    return apartmentRepository.save(apt); 
  }

}
