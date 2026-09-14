package com.whisperwall.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.ReportRequest;
import com.whisperwall.backend.dto.ReportResponse;
import com.whisperwall.backend.service.ReportService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(
        name = "Reports",
        description = "Story Reporting APIs"
)
public class ReportController {

    private final ReportService reportService;
@Operation(
        summary = "Report Story"
)
    @PostMapping("/{storyId}")
    public String reportStory(
            @PathVariable Long storyId,
            @Valid
            @RequestBody ReportRequest request,
            Authentication authentication) {

        return reportService.reportStory(
                storyId,
                request,
                authentication);
    }
    @Operation(
        summary = "View Reports"
)

    @GetMapping
    public List<ReportResponse> getReports() {

        return reportService.getAllReports();
    }
}