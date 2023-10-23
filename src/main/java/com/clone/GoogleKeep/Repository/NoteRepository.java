package com.clone.GoogleKeep.Repository;

import com.clone.GoogleKeep.Model.Note;
import com.clone.GoogleKeep.Model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

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
}
