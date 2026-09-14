package com.whisperwall.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.BookmarkResponse;
import com.whisperwall.backend.dto.ChangePasswordRequest;
import com.whisperwall.backend.dto.CommentSummaryResponse;
import com.whisperwall.backend.dto.StorySummaryResponse;
import com.whisperwall.backend.dto.UpdateProfileRequest;
import com.whisperwall.backend.dto.UserProfileResponse;
import com.whisperwall.backend.exception.InvalidRequestException;
import com.whisperwall.backend.exception.ResourceNotFoundException;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.repository.BookmarkRepository;
import com.whisperwall.backend.repository.CommentRepository;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final CommentRepository commentRepository;
    private final BookmarkRepository bookmarkRepository;
    private final PasswordEncoder passwordEncoder;

    // ===========================
    // Get Logged-in User Profile
    // ===========================
    public UserProfileResponse getProfile(Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return UserProfileResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .anonymousName(user.getAnonymousName())
                .dateOfBirth(user.getDateOfBirth())
                .createdAt(user.getCreatedAt())
                .build();
    }

    // ===========================
    // Update Profile
    // ===========================
    public String updateProfile(
            UpdateProfileRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }

        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }

        if (request.getAnonymousName() != null) {
            user.setAnonymousName(request.getAnonymousName());
        }

        if (request.getDateOfBirth() != null) {
            user.setDateOfBirth(request.getDateOfBirth());
        }

        userRepository.save(user);

        return "Profile updated successfully";
    }

    // ===========================
    // Get My Stories
    // ===========================
   public List<StorySummaryResponse> getMyStories(
        Authentication authentication) {

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new ResourceNotFoundException("User not found"));

    return storyRepository.findByAuthor(user)
            .stream()
            .map(story -> StorySummaryResponse.builder()
                    .id(story.getId())
                    .title(story.getTitle())
                    .content(story.getContent())
                    .anonymousName(
                            story.getAuthor()
                                    .getAnonymousName()
                    )
                    .createdAt(story.getCreatedAt())
                    .build())
            .toList();
}

    // ===========================
    // Get My Comments
    // ===========================
    public List<CommentSummaryResponse> getMyComments(
        Authentication authentication) {

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

    return commentRepository.findByAuthor(user)
            .stream()
            .map(comment -> CommentSummaryResponse.builder()
                    .id(comment.getId())
                    .content(comment.getContent())
                    .storyTitle(
                            comment.getStory()
                                    .getTitle()
                    )
                    .anonymousName(
                            comment.getAuthor()
                                    .getAnonymousName()
                    )
                    .createdAt(comment.getCreatedAt())
                    .build())
            .toList();
}

    // ===========================
    // Get My Bookmarks
    // ===========================
    public List<BookmarkResponse> getMyBookmarks(
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return bookmarkRepository.findByUser(user)
                .stream()
                .map(bookmark -> BookmarkResponse.builder()
                        .bookmarkId(bookmark.getId())
                        .storyId(bookmark.getStory().getId())
                        .title(bookmark.getStory().getTitle())
                        .content(bookmark.getStory().getContent())
                        .anonymousName(
                                bookmark.getStory()
                                        .getAuthor()
                                        .getAnonymousName()
                        )
                        .createdAt(bookmark.getCreatedAt())
                        .build())
                .toList();
    }
    public String changePassword(
        ChangePasswordRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "User not found"));

    if (!passwordEncoder.matches(
            request.getOldPassword(),
            user.getPassword())) {

        throw new InvalidRequestException(
                "Old password is incorrect");
    }

    user.setPassword(
            passwordEncoder.encode(
                    request.getNewPassword()));

    userRepository.save(user);

    return "Password changed successfully";
}
}