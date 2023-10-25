package com.clone.GoogleKeep.DTO.ResponseDTO;

import com.clone.GoogleKeep.Model.Gender;
import com.clone.GoogleKeep.Model.Label;
import com.clone.GoogleKeep.Model.Note;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

    private int id;

    private String firstName;

    private String lastName;

    @Column(unique = true)
    private String email;

    private String gender;

    private List<Note> noteList = new ArrayList<>();

    private List<Label> labelList = new ArrayList<>();
}
