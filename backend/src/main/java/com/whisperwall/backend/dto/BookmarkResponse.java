package com.whisperwall.backend.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BookmarkResponse {

    private Long bookmarkId;

    private Long storyId;

    private String title;

    private String content;

    private String anonymousName;

    private LocalDateTime createdAt;
}