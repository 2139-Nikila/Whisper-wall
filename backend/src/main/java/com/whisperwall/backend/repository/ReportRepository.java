package com.whisperwall.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.whisperwall.backend.model.Report;

public interface ReportRepository
        extends JpaRepository<Report, Long> {

    List<Report> findByStoryId(Long storyId);
}