package com.paf.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
<<<<<<< HEAD
=======
import org.springframework.context.annotation.Bean;
import org.modelmapper.ModelMapper;
>>>>>>> f0ccf6eb1408ee939a9387adf170a7d82dc525ca

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
<<<<<<< HEAD
=======
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
>>>>>>> f0ccf6eb1408ee939a9387adf170a7d82dc525ca

}
