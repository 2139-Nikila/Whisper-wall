package com.whisperwall.backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentSummaryResponse {

    private Long id;

    private String content;

    private String storyTitle;

    private String anonymousName;

    private LocalDateTime createdAt;

}