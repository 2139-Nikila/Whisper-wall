package com.whisperwall.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.BookmarkResponse;
import com.whisperwall.backend.dto.ChangePasswordRequest;
import com.whisperwall.backend.dto.CommentSummaryResponse;
import com.whisperwall.backend.dto.StorySummaryResponse;
import com.whisperwall.backend.dto.UpdateProfileRequest;
import com.whisperwall.backend.dto.UserProfileResponse;
import com.whisperwall.backend.service.UserProfileService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Tag(
        name = "Profile",
        description = "User Profile APIs"
)
public class UserProfileController {

    private final UserProfileService userProfileService;

    // ===========================
    // Get Profile
    // ===========================
    @Operation(
        summary = "Get Profile",
        description = "Returns the profile details of the logged-in user"
)

    @GetMapping
    public UserProfileResponse getProfile(
            Authentication authentication) {

        return userProfileService.getProfile(authentication);
    }

    // ===========================
    // Update Profile
    // ===========================
    @Operation(
        summary = "Update Profile",
        description = "Updates the logged-in user's profile information"
)

    @PutMapping
    public String updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication) {

        return userProfileService.updateProfile(
                request,
                authentication);
    }

    // ===========================
    // Get My Stories
    // ===========================
    @Operation(
        summary = "Get My Stories",
        description = "Returns all stories created by the logged-in user"
)
    @GetMapping("/stories")
public List<StorySummaryResponse> getMyStories(
        Authentication authentication) {

    return userProfileService.getMyStories(authentication);
}

    // ===========================
    // Get My Comments
    // ===========================
    @Operation(
        summary = "Get My Comments",
        description = "Returns all comments created by the logged-in user"
)
   @GetMapping("/comments")
public List<CommentSummaryResponse> getMyComments(
        Authentication authentication) {

    return userProfileService.getMyComments(authentication);
}

    // ===========================
    // Get My Bookmarks
    // ===========================
    @Operation(
        summary = "Get My Bookmarks",
        description = "Returns all bookmarks of the logged-in user"
)
    @GetMapping("/bookmarks")
    public List<BookmarkResponse> getMyBookmarks(
            Authentication authentication) {

        return userProfileService.getMyBookmarks(authentication);
    }
        @Operation(
        summary = "update My Password",
        description = "update the password of the logged-in user"
)

    @PutMapping("/password")
public ResponseEntity<String> changePassword(
        @RequestBody 
        @Valid
        ChangePasswordRequest request,
        Authentication authentication) {

    return ResponseEntity.ok(
            userProfileService.changePassword(
                    request,
                    authentication));
}
}