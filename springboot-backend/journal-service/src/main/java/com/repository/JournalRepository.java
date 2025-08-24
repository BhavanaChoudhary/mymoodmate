package com.moodmate.journal_service.repository;

import com.moodmate.journal_service.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JournalRepository extends JpaRepository<JournalEntry, Long> {

    // 🔎 Fetch all journal entries by a given user
    List<JournalEntry> findByUserId(Long userId);
}
