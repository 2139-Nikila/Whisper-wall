package com.whisperwall.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.DashboardResponse;
import com.whisperwall.backend.service.DashboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(
        name = "Dashboard",
        description = "Dashboard Statistics"
)
public class DashboardController {

    private final DashboardService dashboardService;
    @Operation(
        summary = "Dashboard Statistics"
)

    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard();

    }
}