package com.whisperwall.backend.service;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.StoryRequest;
import com.whisperwall.backend.dto.StoryResponse;
import com.whisperwall.backend.dto.UpdateStoryRequest;
import com.whisperwall.backend.exception.ResourceNotFoundException;
import com.whisperwall.backend.exception.UnauthorizedActionException;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    public String createStory(
            StoryRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Story story = Story.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(user)
                .createdAt(LocalDateTime.now())
                .build();

        storyRepository.save(story);

        return "Story created successfully";
    }

    public List<StoryResponse> getAllStories() {

        return storyRepository.findAll()
                .stream()
                .map(story -> StoryResponse.builder()
                        .id(story.getId())
                        .title(story.getTitle())
                        .content(story.getContent())
                        .anonymousName(
                                story.getAuthor().getAnonymousName()
                        )
                        .createdAt(story.getCreatedAt())
                        .build())
                .toList();
    }

    public StoryResponse getStoryById(Long id) {

        Story story = storyRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Story not found"));

        return StoryResponse.builder()
                .id(story.getId())
                .title(story.getTitle())
                .content(story.getContent())
                .anonymousName(
                        story.getAuthor().getAnonymousName()
                )
                .createdAt(story.getCreatedAt())
                .build();
    }

    public String deleteStory(
            Long storyId,
            Authentication authentication) {

        String email = authentication.getName();

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Story not found"));

        if (!story.getAuthor().getEmail().equals(email)) {
            throw new UnauthorizedActionException(
                    "You can only delete your own story");
        }

        storyRepository.delete(story);

        return "Story deleted successfully";
    }

    public List<StoryResponse> getFeed(
            int page,
            int size) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("createdAt").descending()
                );

        return storyRepository
                .findAll(pageable)
                .stream()
                .map(story -> StoryResponse.builder()
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

    public List<StoryResponse> searchStories(
            String keyword) {

        return storyRepository
                .findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .map(story -> StoryResponse.builder()
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

    public List<StoryResponse> getStoriesByUser(
            String anonymousName) {

        return storyRepository
                .findByAuthorAnonymousNameIgnoreCase(
                        anonymousName
                )
                .stream()
                .map(story -> StoryResponse.builder()
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
    public String updateStory(
        Long storyId,
        UpdateStoryRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    Story story = storyRepository.findById(storyId)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Story not found"));

    if (!story.getAuthor().getEmail().equals(email)) {

        throw new UnauthorizedActionException(
                "You can only edit your own story");
    }

    if (request.getTitle() != null) {
        story.setTitle(request.getTitle());
    }

    if (request.getContent() != null) {
        story.setContent(request.getContent());
    }

    storyRepository.save(story);

    return "Story updated successfully";
}
}