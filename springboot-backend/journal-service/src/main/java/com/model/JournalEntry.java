package com.moodmate.journal_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "journal_entries")
@Data                   // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor      // generates no-arg constructor
@AllArgsConstructor     // generates all-arg constructor
@Builder                // allows builder pattern
public class JournalEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "entry_date")
    @Builder.Default
    private LocalDate entryDate = LocalDate.now();

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "mood_rating")
    private Integer moodRating;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}