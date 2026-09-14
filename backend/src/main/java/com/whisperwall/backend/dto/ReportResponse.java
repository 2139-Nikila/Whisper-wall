package com.whisperwall.backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ReportResponse {

    private Long reportId;

    private Long storyId;

    private String storyTitle;

    private String reason;

    private String reportedBy;

    private LocalDateTime createdAt;
}
