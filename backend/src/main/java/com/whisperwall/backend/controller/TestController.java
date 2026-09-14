package com.whisperwall.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(
        name = "Test Control",
        description = "Authentication"
)
public class TestController {
@Operation(
        summary = "Get result",
        description = "Returns the result for authentication"
)
    @GetMapping("/api/test")
    public String test() {
        return "JWT Authentication Working";
    }
}