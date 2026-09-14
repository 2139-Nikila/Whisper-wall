package com.whisperwall.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.LeaderboardResponse;
import com.whisperwall.backend.service.LeaderboardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
@Tag(
        name = "Leaderboard",
        description = "Top Stories Leaderboard"
)
public class LeaderboardController {

    private final LeaderboardService leaderboardService;
@Operation(
        summary = "Get Leaderboard"
)
    @GetMapping
    public List<LeaderboardResponse> getLeaderboard() {

        return leaderboardService.getLeaderboard();

    }
}