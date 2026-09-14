package com.whisperwall.backend.service;

import java.time.LocalDateTime;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.VoteRequest;
import com.whisperwall.backend.exception.ResourceNotFoundException;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.model.Vote;
import com.whisperwall.backend.model.VoteType;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;
import com.whisperwall.backend.repository.VoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final StoryRepository storyRepository;

    public String vote(
            Long storyId,
            VoteRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found"));

        Vote existingVote = voteRepository.findByUserAndStory(user, story)
                .orElse(null);

        if (existingVote == null) {
            Vote vote = Vote.builder()
                    .user(user)
                    .story(story)
                    .voteType(request.getVoteType())
                    .createdAt(LocalDateTime.now())
                    .build();

            voteRepository.save(vote);

            return "Vote added successfully";
        }

        existingVote.setVoteType(request.getVoteType());
        voteRepository.save(existingVote);

        return "Vote updated successfully";
    }

    public long getLikes(Long storyId) {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found"));

        return voteRepository.countByStoryAndVoteType(
                story,
                VoteType.LIKE
        );
    }

    public long getDislikes(Long storyId) {
        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found"));

        return voteRepository.countByStoryAndVoteType(
                story,
                VoteType.DISLIKE
        );
    }
}