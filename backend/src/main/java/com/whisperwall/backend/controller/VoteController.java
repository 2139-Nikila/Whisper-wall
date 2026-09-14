package com.whisperwall.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.VoteRequest;
import com.whisperwall.backend.service.VoteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
@Tag(
        name = "Votes",
        description = "Like and Dislike APIs"
)
public class VoteController {

    private final VoteService voteService;
@Operation(summary = "Vote on Story")
    @PostMapping("/{storyId}")
    public String vote(
            @PathVariable Long storyId,
            @RequestBody VoteRequest request,
            Authentication authentication) {

        return voteService.vote(
                storyId,
                request,
                authentication
        );
    }
@Operation(summary = "Get Likes")
    @GetMapping("/{storyId}/likes")
    public long getLikes(
            @PathVariable Long storyId) {

        return voteService.getLikes(storyId);
    }
@Operation(summary = "Get Dislikes")
    @GetMapping("/{storyId}/dislikes")
    public long getDislikes(
            @PathVariable Long storyId) {

        return voteService.getDislikes(storyId);
    }
}