package com.whisperwall.backend.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.BookmarkResponse;
import com.whisperwall.backend.service.BookmarkService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
@Tag(
        name = "Bookmarks",
        description = "Bookmark APIs"
)
public class BookmarkController {

    private final BookmarkService bookmarkService;
@Operation(
        summary = "Add Bookmark",
        description = "Adds a story to the logged-in user's bookmarks"
)
    @PostMapping("/{storyId}")
    public String addBookmark(
            @PathVariable Long storyId,
            Authentication authentication) {

        return bookmarkService.addBookmark(
                storyId,
                authentication
        );
    }
    @Operation(
        summary = "Remove Bookmark",
        description = "Removes a story from the logged-in user's bookmarks"
)

    @DeleteMapping("/{storyId}")
    public String removeBookmark(
            @PathVariable Long storyId,
            Authentication authentication) {

        return bookmarkService.removeBookmark(
                storyId,
                authentication
        );
    }
@Operation(
        summary = "Get My Bookmarks",
        description = "Returns all bookmarks of the logged-in user"
)
    @GetMapping
public List<BookmarkResponse> getBookmarks(
        Authentication authentication) {

    return bookmarkService.getMyBookmarks(
            authentication
    );
}
}