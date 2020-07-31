package com.revature.orangeserver;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OrangeserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrangeserverApplication.class, args);
		try {
	        Date expMoveIn = new SimpleDateFormat("MM-DD-YYYY").parse("10-01-2020");
	        System.out.println(expMoveIn);
        } catch (Exception e) {
          System.out.println(e);
        }

	}

}
