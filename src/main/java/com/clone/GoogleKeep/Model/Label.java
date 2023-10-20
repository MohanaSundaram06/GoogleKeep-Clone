package com.clone.GoogleKeep.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany(mappedBy = "labels", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Note> noteSet = new HashSet<>();
}
