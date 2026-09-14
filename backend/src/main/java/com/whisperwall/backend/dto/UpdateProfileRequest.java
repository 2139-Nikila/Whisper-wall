package com.whisperwall.backend.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {

    private String firstName;

    private String lastName;

    private String anonymousName;

    private LocalDate dateOfBirth;

}