package com.clone.GoogleKeep.Repository;

import com.clone.GoogleKeep.Model.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends JpaRepository<Label,Integer> {
}
