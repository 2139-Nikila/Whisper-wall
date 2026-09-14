package com.whisperwall.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LeaderboardResponse {

    private int rank;

    private Long storyId;

    private String title;

    private String anonymousName;

    private long likes;

    private long dislikes;

    private long score;

}