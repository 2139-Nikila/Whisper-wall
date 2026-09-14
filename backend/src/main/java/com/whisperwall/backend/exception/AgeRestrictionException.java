package com.whisperwall.backend.exception;

public class AgeRestrictionException extends RuntimeException {

    public AgeRestrictionException(String message) {
        super(message);
    }
}