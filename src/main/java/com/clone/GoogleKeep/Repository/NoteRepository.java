package com.clone.GoogleKeep.Repository;

import com.clone.GoogleKeep.Model.Note;
import com.clone.GoogleKeep.Model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    Optional<Note> findByIdAndUser(int noteId, User user);

//    List<Note> findAllByUserAndIsArchivedAndIsTrashedOrderByPinnedTimeDescAndOrderByCreatedAtDesc(User user, boolean b, boolean b1);

    List<Note> findAllByUserAndIsTrashed(User userId, boolean b);

    List<Note> findAllByUserAndIsArchived(User user, boolean b);

    @Query(value = "select * from Note where user_id = :user_id and is_remainder_set = :b", nativeQuery = true)
    List<Note> findAllByIsRemainderSet(@Param("user_id") int user, @Param("b") boolean b);

    List<Note> findAllByUserAndIsArchivedAndIsTrashed(User user, boolean b, boolean b1, Sort sort);

    List<Note> findAllByUserAndIsArchivedAndIsTrashed(User user, boolean b, boolean b1);

    List<Note> findAllByLabelsIdAndIsTrashed(int labelId,boolean b);

    List<Note> findAllByUserAndDescriptionContains(User user, String text);


    @Transactional
    @Modifying
    @Query(value = "delete from Note where user_id = :user_id and is_trashed = :b and trashed_date < (:now - INTERVAL 30 days)", nativeQuery = true)
    void deleteOlderTrashes(@Param("user_id") int user, @Param("b") boolean b,  @Param("now") LocalDateTime now);
}
