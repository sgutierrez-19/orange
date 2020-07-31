package com.revature.orangeserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.orangeserver.models.Notes;

public interface NotesRepository  extends JpaRepository<Notes, Integer> {

}
