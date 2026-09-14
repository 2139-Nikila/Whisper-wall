package com.whisperwall.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardResponse {

    private long totalUsers;

    private long totalStories;

    private long totalComments;

    private long totalBookmarks;

    private long totalLikes;

    private long totalDislikes;

    private long totalReports;

}