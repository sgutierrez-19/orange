package com.revature.orangeserver;

import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OrangeserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrangeserverApplication.class, args);
		try {
		  String myDate ="2020/10/29";
		  SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
		  Date date = sdf.parse(myDate);
		  long millis = date.getTime();
	 
	      java.sql.Date expMoveIn = new java.sql.Date(millis);
		  System.out.println(expMoveIn);
        } catch (Exception e) {
          System.out.println(e);
        }

	}

	  @Bean
	  public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	      @Override
	      public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
	            .allowedHeaders("*")
	            .allowCredentials(true)
	            .allowedOrigins("http://localhost:3000");

	      }
	    };
	  }
}
