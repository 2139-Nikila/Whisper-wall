package com.whisperwall.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserProfileResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String anonymousName;

    private LocalDate dateOfBirth;

    private LocalDateTime createdAt;

}