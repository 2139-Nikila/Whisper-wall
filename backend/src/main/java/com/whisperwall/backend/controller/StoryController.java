package com.whisperwall.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.StoryRequest;
import com.whisperwall.backend.dto.StoryResponse;
import com.whisperwall.backend.dto.UpdateStoryRequest;
import com.whisperwall.backend.service.StoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
@Tag(
        name = "Stories",
        description = "Story Management APIs"
)
public class StoryController {

    private final StoryService storyService;
    @Operation(
        summary = "Create Story",
        description = "Creates a new anonymous story"
)
@ApiResponses({
        @ApiResponse(responseCode = "200",
                description = "Story created successfully"),
        @ApiResponse(responseCode = "400",
                description = "Validation failed")
})
    @PostMapping
    public String createStory(
        @Valid
            @RequestBody StoryRequest request,
            Authentication authentication) {

        return storyService.createStory(
                request,
                authentication
        );
    }
    @Operation(
        summary = "Get All Stories",
        description = "Returns all available stories"
)
   @GetMapping
public List<StoryResponse> getAllStories() {
    return storyService.getAllStories();
}
@Operation(
        summary = "Get Story By ID",
        description = "Returns a story using its ID"
)

    @GetMapping("/{id}")
public StoryResponse getStoryById(
        @PathVariable Long id) {

    return storyService.getStoryById(id);
}
@Operation(
        summary = "Delete Story",
        description = "Deletes a story created by the logged-in user"
)
@DeleteMapping("/{id}")
public String deleteStory(
        @PathVariable Long id,
        Authentication authentication) {

    return storyService.deleteStory(
            id,
            authentication
    );
}
@Operation(
        summary = "Story Feed",
        description = "Returns paginated stories"
)
@GetMapping("/feed")
public List<StoryResponse> getFeed(

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "5")
        int size) {

    return storyService.getFeed(
            page,
            size
    );
}
@Operation(
        summary = "Search Stories",
        description = "Search stories by keyword"
)
@GetMapping("/search")
public List<StoryResponse> searchStories(

        @RequestParam
        String keyword) {

    return storyService.searchStories(
            keyword
    );
}
@Operation(
        summary = "Stories by Anonymous User",
        description = "Returns stories posted by an anonymous user"
)
@GetMapping("/user")
public List<StoryResponse> getStoriesByUser(

        @RequestParam
        String name) {

    return storyService.getStoriesByUser(
            name
    );
}
@Operation(
        summary = "Update Story",
        description = "Updates an existing story"
)
@PutMapping("/{storyId}")
public ResponseEntity<String> updateStory(
        @PathVariable Long storyId,
        @RequestBody UpdateStoryRequest request,
        Authentication authentication) {

    return ResponseEntity.ok(
            storyService.updateStory(
                    storyId,
                    request,
                    authentication
            )
    );
}
}