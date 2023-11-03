package com.clone.GoogleKeep.ObjectTransfomers;

import com.clone.GoogleKeep.DTO.ResponseDTO.NoteResponseDTO;
import com.clone.GoogleKeep.Model.Note;

import java.awt.desktop.SystemSleepEvent;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class NoteTransformer {

    public static NoteResponseDTO ModelToDTO(Note note) {

        return NoteResponseDTO.builder()
                .id(note.getId())
                .title(note.getTitle())
                .description(note.getDescription())
                .createdAt(note.getCreatedAt())
                .isArchived(note.isArchived())
                .isPinned(note.isPinned())
                .pinnedTime(note.getPinnedTime())
                .isRemainderSet(note.isRemainderSet())
                .remainderTime(note.getRemainderTime())
                .isTrashed(note.isTrashed())
                .trashedDate(note.getTrashedDate())
                .userId(note.getUser().getId())
                .userName(note.getUser().getFirstName() +" "+ note.getUser().getLastName())
                .labels(note.getLabels())
                .build();
    }

    public static List<NoteResponseDTO> ModelToDTO(List<Note> notes) {

        List<NoteResponseDTO> noteResponseDTOS = new ArrayList<>();

        for(Note note : notes) {
            noteResponseDTOS.add(NoteResponseDTO.builder()
                    .id(note.getId())
                    .title(note.getTitle())
                    .description(note.getDescription())
                    .createdAt(note.getCreatedAt())
                    .isArchived(note.isArchived())
                    .isPinned(note.isPinned())
                    .pinnedTime(note.getPinnedTime())
                    .isRemainderSet(note.isRemainderSet())
                    .remainderTime(note.getRemainderTime())
                    .isTrashed(note.isTrashed())
                    .trashedDate(note.getTrashedDate())
                    .userId(note.getUser().getId())
                    .userName(note.getUser().getFirstName() + " " + note.getUser().getLastName())
                    .labels(note.getLabels())
                    .build());
        }
        return noteResponseDTOS;
    }

}
