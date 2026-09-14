package com.whisperwall.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.whisperwall.backend.dto.BookmarkResponse;
import com.whisperwall.backend.exception.DuplicateResourceException;
import com.whisperwall.backend.exception.ResourceNotFoundException;
import com.whisperwall.backend.model.Bookmark;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;
import com.whisperwall.backend.repository.BookmarkRepository;
import com.whisperwall.backend.repository.StoryRepository;
import com.whisperwall.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;

    public String addBookmark(Long storyId, Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found"));

        Optional<Bookmark> existing =
                bookmarkRepository.findByUserAndStory(user, story);

        if (existing.isPresent()) {
    throw new DuplicateResourceException(
            "Story already bookmarked");
}

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .story(story)
                .createdAt(LocalDateTime.now())
                .build();

        bookmarkRepository.save(bookmark);

        return "Bookmark added successfully";
    }

    public String removeBookmark(Long storyId, Authentication authentication) {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Story story = storyRepository.findById(storyId)
                .orElseThrow(() -> new ResourceNotFoundException("Story not found"));

        Bookmark bookmark = bookmarkRepository
                .findByUserAndStory(user, story)
                .orElseThrow(() -> new ResourceNotFoundException("Bookmark not found"));

        bookmarkRepository.delete(bookmark);

        return "Bookmark removed successfully";
    }

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
}