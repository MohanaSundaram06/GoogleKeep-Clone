package com.clone.GoogleKeep.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@Entity
@Table
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String description;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private boolean isArchived;

    private boolean isPinned;

    private LocalDateTime pinnedTime;

    private boolean isRemainderSet;

    private LocalDateTime remainderTime;

    private boolean isTrashed;

    private LocalDateTime trashedDate;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "note_label",
            joinColumns ={@JoinColumn(name = "note_id")},
            inverseJoinColumns = {@JoinColumn(name = "label_id")})
    private Set<Label> labels = new HashSet<>();

    @ManyToOne
    @JoinColumn
    @JsonIgnore
    private User user;

    public void removeLabel(Label label){
        this.labels.remove(label);
        label.getNoteSet().remove(this);
    }

    public void addLabel(Label label){
        this.labels.add(label);
    }
}
