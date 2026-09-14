package com.whisperwall.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.model.Vote;
import com.whisperwall.backend.model.VoteType;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    Optional<Vote> findByUserAndStory(User user, Story story);

    long countByStoryAndVoteType(
            Story story,
            VoteType voteType
    );
}