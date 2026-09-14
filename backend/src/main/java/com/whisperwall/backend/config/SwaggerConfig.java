package com.whisperwall.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI whisperWallAPI() {

        final String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()

                .info(
                        new Info()
                                .title("WhisperWall REST API")
                                .description(
                                        "Anonymous Story Sharing Platform built using Spring Boot, JWT Authentication, MySQL and Swagger."
                                )
                                .version("1.0.0")
                                .contact(
                                        new Contact()
                                                .name("NIKILA FENNER")
                                                .email("niki@gmail.com")
                                                .url("https://github.com/2139-Nikila")
                                )
                                .license(
                                        new License()
                                                .name("MIT License")
                                )
                )

                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName)
                )

                .components(
                        new Components()
                                .addSecuritySchemes(
                                        securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}