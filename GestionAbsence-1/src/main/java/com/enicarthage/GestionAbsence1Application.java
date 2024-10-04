package com.enicarthage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.enicarthage.entities"})
public class GestionAbsence1Application {

	public static void main(String[] args) {
		SpringApplication.run(GestionAbsence1Application.class, args);
	}

}