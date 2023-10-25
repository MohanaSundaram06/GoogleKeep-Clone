package com.clone.GoogleKeep.Service.Implementaion;

import com.clone.GoogleKeep.DTO.RequestDTO.NoteRequestDTO;
import com.clone.GoogleKeep.Exceptions.LabelOverFlowException;
import com.clone.GoogleKeep.Exceptions.NoteNotFoundException;
import com.clone.GoogleKeep.Model.Label;
import com.clone.GoogleKeep.Model.Note;
import com.clone.GoogleKeep.Model.User;
import com.clone.GoogleKeep.Repository.NoteRepository;
import com.clone.GoogleKeep.Service.LabelService;
import com.clone.GoogleKeep.Service.NoteService;
import com.clone.GoogleKeep.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    private final UserService userService;
    private final LabelService labelService;

    @Autowired
    public NoteServiceImpl(NoteRepository noteRepository, UserService userService, LabelService labelService) {
        this.noteRepository = noteRepository;
        this.userService = userService;
        this.labelService = labelService;
    }

    @Override
    public Note addNote(int userId, NoteRequestDTO noteRequestDTO) {
        User user = userService.getUserById(userId);
        Note note = new Note();
        note.setTitle(noteRequestDTO.getTitle());
        note.setDescription(noteRequestDTO.getDescription());
        note.setUser(user);
        return noteRepository.save(note);
    }

    @Override
    public Note getNote(int userId, int noteId) {
        return validateUserAndNote(userId,noteId);
    }

    @Override
    public Note updateNote(int userId, int noteId, NoteRequestDTO noteRequestDTO) {
       Note note = validateUserAndNote(userId,noteId);
       note.setTitle(noteRequestDTO.getTitle());
       note.setCreatedAt(LocalDateTime.now());
       note.setDescription(noteRequestDTO.getDescription());

       return noteRepository.save(note);
    }

    @Override
    public Note trashNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setTrashed(true);
        note.setTrashedDate(LocalDateTime.now());
        note.setPinned(false);
        note.setPinnedTime(null);
        note.setRemainderSet(false);
        note.setRemainderTime(null);
        return noteRepository.save(note);
    }

    @Override
    public Note restoreTrashNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setTrashed(false);
        note.setTrashedDate(null);
        return noteRepository.save(note);
    }

    @Override
    public Note pinNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setPinned(true);
        note.setPinnedTime(LocalDateTime.now());
        note.setArchived(false);
        return noteRepository.save(note);
    }

    @Override
    public Note unpinNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setPinned(false);
        note.setPinnedTime(null);
        return noteRepository.save(note);
    }

    @Override
    public Note setRemainder(int userId, int noteId, String remainderTime) {
        Note note = validateUserAndNote(userId,noteId);
        if(note.isTrashed()) return note;
        note.setRemainderSet(true);
        note.setRemainderTime(LocalDateTime.parse(remainderTime));
        return noteRepository.save(note);
    }

    @Override
    public Note deleteRemainder(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setRemainderSet(false);
        note.setRemainderTime(null);
        return noteRepository.save(note);
    }

    @Override
    public Note archiveNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setPinned(false);
        note.setPinnedTime(null);
        note.setArchived(true);
        return noteRepository.save(note);
    }

    @Override
    public Note unarchiveNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        note.setArchived(false);
        return noteRepository.save(note);
    }

    @Override
    public void deleteNote(int userId, int noteId) {
        Note note = validateUserAndNote(userId,noteId);
        noteRepository.delete(note);
    }

    @Override
    public List<Note> getNotes(int userId) {
        User user = userService.getUserById(userId);

        Sort sort = Sort.by("pinnedTime").descending()
                .and(Sort.by("createdAt").descending());

        List<Note> notes = noteRepository.findAllByUserAndIsArchivedAndIsTrashed(user,false,false,sort);

//        Thread thread = new Thread(() -> {
//            noteRepository.deleteOlderTrashes(user.getId(), true, LocalDateTime.now());
//        });
//        thread.start();

        noteRepository.deleteOlderTrashes(user.getId(), true, LocalDateTime.now());
        return notes;
    }

    @Override
    public List<Note> getRemainderNotes(int userId) {
        User user = userService.getUserById(userId);
        List<Note> notes = noteRepository.findAllByIsRemainderSet(user.getId(),true);
        return notes;
    }

    @Override
    public List<Note> getTrashedNotes(int userId) {
        User user = userService.getUserById(userId);
        return noteRepository.findAllByUserAndIsTrashed(user,true);
    }

    @Override
    public List<Note> getArchivedNotes(int userId) {
        User user = userService.getUserById(userId);
        return noteRepository.findAllByUserAndIsArchivedAndIsTrashed(user,true,false);
    }

    @Override
    public Note addLabelToNote(int userId, int noteId, int labelId) {
        Note note = validateUserAndNote(userId,noteId);
        Label label = labelService.getLabelById(userId,labelId);

        if(note.getLabels().size() >= 9) throw new LabelOverFlowException("Cannot add more than 9 labels to the note");
        note.addLabel(label);

        return noteRepository.save(note);
    }

    @Override
    public Note removeLabelFromNote(int userId, int noteId, int labelId) {
        Note note = validateUserAndNote(userId,noteId);
        Label label = labelService.getLabelById(userId,labelId);
        note.removeLabel(label);
        return noteRepository.save(note);
    }

    @Override
    public List<Note> getAllNotesByLabel(int userId, int labelId) {

        Label label = labelService.getLabelById(userId,labelId);
        List<Note> notes = noteRepository.findAllByLabelsIdAndIsTrashed(labelId,false);

        return notes;
    }

    @Override
    public List<Note> searchInNotes(int userId, String text) {
        User user = userService.getUserById(userId);
        List<Note> notes = noteRepository.findAllByUserAndDescriptionContains(user,text);
        return notes;
    }

    private Note validateUserAndNote(int userId, int noteId){
        User user = userService.getUserById(userId);
        return noteRepository.findByIdAndUser(noteId,user).
                orElseThrow(() -> new NoteNotFoundException("Note does not exists"));
    }


}
