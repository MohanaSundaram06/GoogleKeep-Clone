package com.clone.GoogleKeep.Repository;

import com.clone.GoogleKeep.Model.Label;
import com.clone.GoogleKeep.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LabelRepository extends JpaRepository<Label,Integer> {
    Optional<Label> findByName(String name);

    Optional<Label> findByIdAndUser(int labelId, User user);
}
