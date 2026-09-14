package com.whisperwall.backend.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.LeaderboardResponse;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.VoteType;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.VoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final StoryRepository storyRepository;
    private final VoteRepository voteRepository;

    public List<LeaderboardResponse> getLeaderboard() {

        List<Story> stories = storyRepository.findAll();

        List<LeaderboardResponse> leaderboard =
                new ArrayList<>();

        for (Story story : stories) {

            long likes =
                    voteRepository.countByStoryAndVoteType(
                            story,
                            VoteType.LIKE
                    );

            long dislikes =
                    voteRepository.countByStoryAndVoteType(
                            story,
                            VoteType.DISLIKE
                    );

            leaderboard.add(
                    LeaderboardResponse.builder()
                            .storyId(story.getId())
                            .title(story.getTitle())
                            .anonymousName(
                                    story.getAuthor()
                                            .getAnonymousName()
                            )
                            .likes(likes)
                            .dislikes(dislikes)
                            .score(likes - dislikes)
                            .build()
            );
        }

        leaderboard.sort(
                Comparator.comparingLong(
                        LeaderboardResponse::getScore
                ).reversed()
        );

        for (int i = 0; i < leaderboard.size(); i++) {

            LeaderboardResponse old =
                    leaderboard.get(i);

            leaderboard.set(
                    i,
                    LeaderboardResponse.builder()
                            .rank(i + 1)
                            .storyId(old.getStoryId())
                            .title(old.getTitle())
                            .anonymousName(old.getAnonymousName())
                            .likes(old.getLikes())
                            .dislikes(old.getDislikes())
                            .score(old.getScore())
                            .build()
            );
        }

        if (leaderboard.size() > 5) {
            return leaderboard.subList(0, 5);
        }

        return leaderboard;
    }
}