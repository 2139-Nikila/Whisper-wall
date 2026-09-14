package com.whisperwall.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.CommentRequest;
import com.whisperwall.backend.dto.CommentResponse;
import com.whisperwall.backend.exception.ResourceNotFoundException;
import com.whisperwall.backend.exception.UnauthorizedActionException;
import com.whisperwall.backend.model.Comment;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.repository.CommentRepository;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    public String addComment(
            Long storyId,
            CommentRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Story not found"));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .author(user)
                .story(story)
                .createdAt(LocalDateTime.now())
                .build();

        commentRepository.save(comment);

        return "Comment added successfully";
    }

    public List<CommentResponse> getComments(Long storyId) {

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Story not found"));

        return commentRepository.findByStory(story)
                .stream()
                .map(comment -> CommentResponse.builder()
                        .id(comment.getId())
                        .content(comment.getContent())
                        .anonymousName(
                                comment.getAuthor()
                                        .getAnonymousName()
                        )
                        .createdAt(comment.getCreatedAt())
                        .build())
                .toList();
    }
    public String deleteComment(
        Long commentId,
        Authentication authentication) {

    String email = authentication.getName();

    Comment comment = commentRepository.findById(commentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Comment not found"));

    if (!comment.getAuthor()
            .getEmail()
            .equals(email)) {

        throw new UnauthorizedActionException(
                "You can only delete your own comment");
    }

    commentRepository.delete(comment);

    return "Comment deleted successfully";
}
}