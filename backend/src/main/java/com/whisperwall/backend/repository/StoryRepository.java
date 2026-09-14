package com.whisperwall.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.whisperwall.backend.model.Story;
import com.whisperwall.backend.model.User;

public interface StoryRepository extends JpaRepository<Story, Long> {

    List<Story> findByAuthor(User author);

    Page<Story> findAll(Pageable pageable);

    List<Story> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(
            String title,
            String content
    );

    List<Story> findByAuthorAnonymousNameIgnoreCase(
            String anonymousName
    );

}