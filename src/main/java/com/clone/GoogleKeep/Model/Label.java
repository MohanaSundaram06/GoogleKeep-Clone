package com.clone.GoogleKeep.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@Entity
@Table
public class Label {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @JsonIgnore
    @ManyToMany(mappedBy = "labels", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Note> noteSet = new HashSet<>();

    @ManyToOne()
    @JoinColumn
    @JsonIgnore
    private User user;
}
