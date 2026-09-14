package com.whisperwall.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whisperwall.backend.model.Bookmark;
import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    Optional<Bookmark> findByUserAndStory(User user, Story story);

    List<Bookmark> findByUser(User user);
}