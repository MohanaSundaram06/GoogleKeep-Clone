package com.clone.GoogleKeep.DTO.ResponseDTO;


import com.clone.GoogleKeep.Model.Label;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NoteResponseDTO {

    private int id;

    private String title;

    private String description;

    private LocalDateTime createdAt;

    private boolean isArchived;

    private boolean isPinned;

    private LocalDateTime pinnedTime;

    private boolean isRemainderSet;

    private LocalDateTime remainderTime;

    private boolean isTrashed;

    private LocalDateTime trashedDate;

    private int userId;

    private String userName;

    private Set<Label> labels = new HashSet<>();

}
