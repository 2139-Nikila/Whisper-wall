package com.whisperwall.backend.service;

import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.DashboardResponse;
import com.whisperwall.backend.model.VoteType;
import com.whisperwall.backend.repository.BookmarkRepository;
import com.whisperwall.backend.repository.CommentRepository;
import com.whisperwall.backend.repository.ReportRepository;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;
import com.whisperwall.backend.repository.VoteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final CommentRepository commentRepository;
    private final BookmarkRepository bookmarkRepository;
    private final VoteRepository voteRepository;
    private final ReportRepository reportRepository;
    
    

    public DashboardResponse getDashboard() {

        long likes = voteRepository.findAll()
                .stream()
                .filter(v -> v.getVoteType() == VoteType.LIKE)
                .count();

        long dislikes = voteRepository.findAll()
                .stream()
                .filter(v -> v.getVoteType() == VoteType.DISLIKE)
                .count();

        return DashboardResponse.builder()
                .totalUsers(userRepository.count())
                .totalStories(storyRepository.count())
                .totalComments(commentRepository.count())
                .totalBookmarks(bookmarkRepository.count())
                .totalLikes(likes)
                .totalDislikes(dislikes)
                .totalReports(reportRepository.count())
                .build();
    }
}