package com.whisperwall.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.whisperwall.backend.dto.CommentRequest;
import com.whisperwall.backend.dto.CommentResponse;
import com.whisperwall.backend.service.CommentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Tag(
        name = "Comments",
        description = "Comment APIs"
)
public class CommentController {

    private final CommentService commentService;
@Operation(
        summary = "Add Comment",
        description = "Adds a comment to a story"
)
   @PostMapping("/{storyId}")
public ResponseEntity<String> addComment(
        @PathVariable Long storyId,
        @Valid
        @RequestBody CommentRequest request,
        Authentication authentication) {

    return ResponseEntity.ok(
            commentService.addComment(
                    storyId,
                    request,
                    authentication));
}
@Operation(
        summary = "Get Comments",
        description = "Returns all comments for a story"
)
@GetMapping("/{storyId}")
public ResponseEntity<List<CommentResponse>> getComments(
        @PathVariable Long storyId) {

    return ResponseEntity.ok(
            commentService.getComments(storyId));
}

@Operation(
        summary = "Delete Comment",
        description = "Deletes a user's own comment"
)
@DeleteMapping("/{commentId}")
public ResponseEntity<String> deleteComment(
        @PathVariable Long commentId,
        Authentication authentication) {

    return ResponseEntity.ok(
            commentService.deleteComment(
                    commentId,
                    authentication));
}
}