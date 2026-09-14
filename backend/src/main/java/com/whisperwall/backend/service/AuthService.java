package com.whisperwall.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.AuthResponse;
import com.whisperwall.backend.dto.LoginRequest;
import com.whisperwall.backend.dto.RegisterRequest;
import com.whisperwall.backend.exception.AgeRestrictionException;
import com.whisperwall.backend.exception.DuplicateResourceException;
import com.whisperwall.backend.exception.InvalidRequestException;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.repository.UserRepository;
import com.whisperwall.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateResourceException(
                    "Email already exists");
        }

        if (userRepository.findByAnonymousName(
                request.getAnonymousName()).isPresent()) {

            throw new DuplicateResourceException(
                    "Anonymous name already taken");
        }

        int age = Period.between(
                request.getDateOfBirth(),
                LocalDate.now()
        ).getYears();

        if (age < 18) {
            throw new AgeRestrictionException(
                    "You must be at least 18 years old to register."
            );
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .anonymousName(request.getAnonymousName())
                .dateOfBirth(request.getDateOfBirth())
                .createdAt(LocalDateTime.now())
                .build();

        userRepository.save(user);

        return "User registered successfully";
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidRequestException(
                                "Invalid email or password"));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new InvalidRequestException(
                    "Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail());

        return new AuthResponse(token);
    }
}