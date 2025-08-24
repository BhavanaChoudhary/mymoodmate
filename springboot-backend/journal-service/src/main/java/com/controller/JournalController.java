package com.moodmate.journal_service.controller;

import com.moodmate.journal_service.model.JournalEntry;
import com.moodmate.journal_service.model.UserStreak;
import com.moodmate.journal_service.repository.JournalRepository;
import com.moodmate.journal_service.repository.UserStreakRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
@CrossOrigin(origins = "http://localhost:3000")
public class JournalController {

    private final JournalRepository journalRepository;
    private final UserStreakRepository userStreakRepository;

    public JournalController(JournalRepository journalRepository, UserStreakRepository userStreakRepository) {
        this.journalRepository = journalRepository;
        this.userStreakRepository = userStreakRepository;
    }

    // 👉 Create a new journal entry and update streak
    @PostMapping("/{userId}")
    public ResponseEntity<JournalEntry> createEntry(@PathVariable Long userId,
                                                    @RequestBody JournalEntry entry) {
        entry.setUserId(userId);
        JournalEntry saved = journalRepository.save(entry);

        // ✅ Update streak logic
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        userStreakRepository.findByUserId(userId).ifPresentOrElse(streak -> {
            if (streak.getLastEntryDate() != null && streak.getLastEntryDate().equals(yesterday)) {
                // continue streak
                streak.setStreakCount(streak.getStreakCount() + 1);
            } else if (streak.getLastEntryDate() == null || streak.getLastEntryDate().isBefore(yesterday)) {
                // reset streak if no entry yesterday or gap >1 day
                streak.setStreakCount(1);
            }
            // If already posted today, just keep streak as-is
            streak.setLastEntryDate(today);
            userStreakRepository.save(streak);
        }, () -> {
            // first streak for this user
            userStreakRepository.save(UserStreak.builder()
                    .userId(userId)
                    .streakCount(1)
                    .lastEntryDate(today)
                    .build());
        });

        return ResponseEntity.ok(saved);
    }

    // 👉 Get all journal entries for a specific user
    @GetMapping("/{userId}")
    public ResponseEntity<List<JournalEntry>> getUserEntries(@PathVariable Long userId) {
        return ResponseEntity.ok(journalRepository.findByUserId(userId));
    }

    // 👉 Get a single journal entry by id
    @GetMapping("/entry/{id}")
    public ResponseEntity<JournalEntry> getEntryById(@PathVariable Long id) {
        return journalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 👉 Delete an entry
    @DeleteMapping("/entry/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        if (!journalRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        journalRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // 👉 Extra: Get User Streak
    @GetMapping("/{userId}/streak")
    public ResponseEntity<UserStreak> getUserStreak(@PathVariable Long userId) {
        return ResponseEntity.ok(
                userStreakRepository.findByUserId(userId)
                        .orElse(UserStreak.builder()
                                .userId(userId)
                                .streakCount(0)
                                .lastEntryDate(null)
                                .build())
        );
    }
}
