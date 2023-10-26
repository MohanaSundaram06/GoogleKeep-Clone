package com.clone.GoogleKeep.Controller;

import com.clone.GoogleKeep.DTO.RequestDTO.NoteRequestDTO;
import com.clone.GoogleKeep.DTO.ResponseDTO.NoteResponseDTO;
import com.clone.GoogleKeep.Exceptions.ApiResponse;
import com.clone.GoogleKeep.Model.Note;
import com.clone.GoogleKeep.ObjectTransfomers.NoteTransformer;
import com.clone.GoogleKeep.Service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/{userId}/note")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/")
    public ResponseEntity<NoteResponseDTO> addNote(@PathVariable("userId") int userId, @RequestBody NoteRequestDTO noteRequestDTO){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.addNote(userId,noteRequestDTO));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{noteId}")
    public ResponseEntity<NoteResponseDTO> getNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.getNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<List<NoteResponseDTO>> getNotes(@PathVariable("userId") int userId){
        List<NoteResponseDTO> noteResponseDTOs = NoteTransformer.ModelToDTO(noteService.getNotes(userId));
        return new ResponseEntity<>(noteResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("/trashed")
    public ResponseEntity<List<NoteResponseDTO>> getTrashedNotes(@PathVariable("userId") int userId){
        List<NoteResponseDTO> noteResponseDTOs = NoteTransformer.ModelToDTO(noteService.getTrashedNotes(userId));
        return new ResponseEntity<>(noteResponseDTOs, HttpStatus.OK);
    }
    @GetMapping("/archived")
    public ResponseEntity<List<NoteResponseDTO>> getArchivedNotes(@PathVariable("userId") int userId){
        List<NoteResponseDTO> noteResponseDTOs = NoteTransformer.ModelToDTO(noteService.getArchivedNotes(userId));
        return new ResponseEntity<>(noteResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("/remainders")
    public ResponseEntity<List<NoteResponseDTO>> getRemainderNotes(@PathVariable("userId") int userId){
        List<NoteResponseDTO> noteResponseDTOs = NoteTransformer.ModelToDTO(noteService.getRemainderNotes(userId));
        return new ResponseEntity<>(noteResponseDTOs, HttpStatus.OK);
    }

    @PutMapping("/{noteId}")
    public ResponseEntity<NoteResponseDTO> updateNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId,
                                           @RequestBody NoteRequestDTO noteRequestDTO){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.updateNote(userId,noteId, noteRequestDTO));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/trash")
    public ResponseEntity<NoteResponseDTO> trashNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.trashNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/restore-trash")
    public ResponseEntity<NoteResponseDTO> restoreTrashNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.restoreTrashNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{noteId}/delete-trash")
    public ResponseEntity<ApiResponse> deleteNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        noteService.deleteNote(userId, noteId);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.OK,
                "Note deleted Successfully"),HttpStatus.OK);
    }

    @PutMapping("/{noteId}/pin")
    public ResponseEntity<NoteResponseDTO> pinNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.pinNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/unpin")
    public ResponseEntity<NoteResponseDTO> unpinNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.unpinNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/set-remainder")
    public ResponseEntity<NoteResponseDTO> setRemainder(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId,
                                             @RequestParam("remainderTime") String remainderTime){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.setRemainder(userId, noteId, remainderTime));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/delete-remainder")
    public ResponseEntity<NoteResponseDTO> deleteRemainder(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.deleteRemainder(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/archive")
    public ResponseEntity<NoteResponseDTO> archiveNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.archiveNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/unarchive")
    public ResponseEntity<NoteResponseDTO> unarchiveNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.unarchiveNote(userId, noteId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/add-label/{labelId}")
    public ResponseEntity<NoteResponseDTO> addLabelToNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId,
                                                          @PathVariable("labelId") int labelId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.addLabelToNote(userId, noteId,labelId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @PutMapping("/{noteId}/remove-label/{labelId}")
    public ResponseEntity<NoteResponseDTO> removeLabelFromNote(@PathVariable("userId") int userId, @PathVariable("noteId") int noteId,
                                                          @PathVariable("labelId") int labelId){
        NoteResponseDTO noteResponseDTO = NoteTransformer.ModelToDTO(noteService.removeLabelFromNote(userId, noteId,labelId));
        return new ResponseEntity<>(noteResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/{labelId}/notes")
    public ResponseEntity<List<Note>> getAllNotesByLabel(@PathVariable("userId") int userId,
                                                          @PathVariable("labelId") int labelId){
        List<Note> notes = noteService.getAllNotesByLabel(userId,labelId);
        return new ResponseEntity<>(notes,HttpStatus.OK);
    }

    @GetMapping("/search/{text}")
    public ResponseEntity<List<Note>> searchInNotes(@PathVariable("userId") int userId,
                                                         @PathVariable("text") String text){
        List<Note> notes = noteService.searchInNotes(userId,text);
        return new ResponseEntity<>(notes,HttpStatus.OK);
    }
}













