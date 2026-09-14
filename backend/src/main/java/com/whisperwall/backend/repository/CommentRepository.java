package com.whisperwall.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whisperwall.backend.model.Comment;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;

public interface CommentRepository
        extends JpaRepository<Comment, Long> {

    List<Comment> findByStory(Story story);

    List<Comment> findByAuthor(User author);
}