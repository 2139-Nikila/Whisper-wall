package com.whisperwall.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.ReportRequest;
import com.whisperwall.backend.dto.ReportResponse;
import com.whisperwall.backend.exception.ResourceNotFoundException;
import com.whisperwall.backend.model.Report;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.repository.ReportRepository;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository reportRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    public String reportStory(
            Long storyId,
            ReportRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Story not found"));

        Report report = Report.builder()
                .reason(request.getReason())
                .story(story)
                .reportedBy(user)
                .createdAt(LocalDateTime.now())
                .build();

        reportRepository.save(report);

        return "Story reported successfully";
    }

    public List<ReportResponse> getAllReports() {

        return reportRepository.findAll()
                .stream()
                .map(report -> ReportResponse.builder()
                        .reportId(report.getId())
                        .storyId(report.getStory().getId())
                        .storyTitle(report.getStory().getTitle())
                        .reason(report.getReason())
                        .reportedBy(
                                report.getReportedBy()
                                        .getAnonymousName())
                        .createdAt(report.getCreatedAt())
                        .build())
                .toList();
    }
}