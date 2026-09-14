package com.whisperwall.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.AuthResponse;
import com.whisperwall.backend.dto.LoginRequest;
import com.whisperwall.backend.dto.RegisterRequest;
import com.whisperwall.backend.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(
    name = "Authentication",
    description = "User Registration and Login APIs"
)
public class AuthController {

    private final AuthService authService;
    @Operation(
        summary = "Register User",
        description = "Registers a new user into WhisperWall"
)
@ApiResponses({
        @ApiResponse(responseCode = "200",
                description = "User registered successfully"),
        @ApiResponse(responseCode = "400",
                description = "Invalid request"),
        @ApiResponse(responseCode = "409",
                description = "Email already exists")
})
    @PostMapping("/register")
    public String register
    (   @Valid
        @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @Operation(
        summary = "Login User",
        description = "Authenticates a user and returns JWT token"
)
@ApiResponses({
        @ApiResponse(responseCode = "200",
                description = "Login successful"),
        @ApiResponse(responseCode = "400",
                description = "Invalid credentials")
})
    @PostMapping("/login")
    public AuthResponse login(
        @Valid
        @RequestBody LoginRequest request) {
        return authService.login(request);
    }
    
}