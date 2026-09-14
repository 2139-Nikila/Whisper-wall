package com.whisperwall.backend.exception;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ApiErrorResponse {

    private boolean success;

    private int status;

    private String message;

    private LocalDateTime timestamp;

}