package com.clone.GoogleKeep.Service;

import com.clone.GoogleKeep.DTO.RequestDTO.NoteRequestDTO;
import com.clone.GoogleKeep.Model.Note;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NoteService {
    public Note addNote(int userId, NoteRequestDTO noteRequestDTO);

    public Note getNote(int userId, int noteId);

    public Note updateNote(int userId, int noteId, NoteRequestDTO noteRequestDTO);

    public Note trashNote(int userId, int noteId);

    public Note restoreTrashNote(int userId, int noteId);

    public Note pinNote(int userId, int noteId);

    public Note unpinNote(int userId, int noteId);

    public Note setRemainder(int userId, int noteId,String remainderTime);

    public Note deleteRemainder(int userId, int noteId);

    public Note archiveNote(int userId, int noteId);

    public Note unarchiveNote(int userId, int noteId);

    public void deleteNote(int userId, int noteId);

    public List<Note> getNotes(int userId);

    List<Note> getTrashedNotes(int userId);

    List<Note> getArchivedNotes(int userId);

    List<Note> getRemainderNotes(int userId);

    Note addLabelToNote(int userId, int noteId, int labelId);

    Note removeLabelFromNote(int userId, int noteId, int labelId);
}
