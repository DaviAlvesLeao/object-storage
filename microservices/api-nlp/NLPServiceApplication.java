package com.example.nlp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class NlpServiceApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(NlpServiceApplication.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", "8081")); // Set the port here
        ConfigurableApplicationContext context = app.run(args);
    }
}
